#!/usr/bin/env python3

import requests
import sys
import json
import boto3
import os
import time
import subprocess
from botocore.config import Config

import argparse

parser = argparse.ArgumentParser(description="Field Trainer Update Client")
parser.add_argument('--work-dir', dest='work_dir', type=str, default="/home/pi/.ft-update",
                    help="Override updaters workdir, where packages will be installed")


def get_cone_type():
    # We are assuming that fieldcones are running the Pi zero
    # and smart cones are _anything_ else as we've supported
    # two different platforms thus far
    try:
        with open('/proc/device-tree/model') as model_file:
            text = model_file.read()
            if 'Pi Zero' in text:
                return 'field'
            else:
                return 'smart'
        raise "Could not figure out cone type!"
    except FileNotFoundError:
        # In this case we'll assume we're on a development system
        # for testing, assume we're a smart cone
        return 'smart'
    except:
        # any other error and we blow up as we can't meaningfully
        # continue at this point
        sys.exit(-1)


def read_json_file(path):
    with open(path, "r") as file:
        return json.load(file)


def find_packages_to_update(remotePackages):
    # Load the local copy..
    try:
        localPackages = read_json_file("/var/tmp/builds.json")
    except FileNotFoundError:
        # this is fine, just assume no packages installed
        localPackages = {
            "packages": [

            ]
        }
    except Exception as error:
        print('Fatal error: Failed to open local builds.json, even though the file appears to be present! Error: {}'.format(error))
        sys.exit(-1)

    print('Total number of local packages: {}'.format(
        len(localPackages['packages'])))

    # Start with the whole list of remote packages, remove any for which we have the latest
    # version as found in `localPackages`
    packagesToUpdate = []
    for remotePackage in remotePackages['packages']:
        packagesToUpdate.append(
            {'name': remotePackage['name'], 'uri': remotePackage['uri']})

    for remotePackage in remotePackages:
        for localPackage in localPackages:
            try:
                if localPackage['name'] == remotePackage['name'] and localPackage['version'] >= remotePackage['version']:
                    # needs update
                    packagesToUpdate.remove(remotePackage['name'])
                    packagesToUpdate = [package for package in packagesToUpdate if not (
                        package['name'] == remotePackage['name'])]
            except:
                pass

    print('List of packages which need an update: {}'.format(packagesToUpdate))
    return packagesToUpdate


def download_all_packages(packages):
    config = Config(s3={"use_accelerate_endpoint": True})
    s3_resource = boto3.resource("s3", region_name="us-west-2", config=config)

    s3 = s3_resource.meta.client

    for package in packages:
        start = time.time()
        downloadPackage(s3, package['name'], package['uri'])
        end = time.time()
        print('Time Elapsed: {}', end - start)


class ProgressPercentage(object):
    def __init__(self, client, bucket, filename):
        self._size = client.head_object(
            Bucket=bucket, Key=filename).get('ContentLength')
        self._seen_so_far = 0

    def __call__(self, bytes_amount):
        self._seen_so_far += bytes_amount
        percentage = round((self._seen_so_far / self._size) * 100, 2)
        print("Percent: {}".format(percentage))
        sys.stdout.flush()


def downloadPackage(s3, packageName, packageUri):
    print("Downloading package {}. URI: {}".format(
        packageName, packageUri))

    progress = ProgressPercentage(
        s3, 'field-trainer-builds', packageUri)
    s3.download_file('field-trainer-builds',
                     packageUri, '{}/downloads/{}'.format(args.work_dir, packageUri.split('/')[1]), Callback=progress)


def extract_packages(packages):
    # Each package is a .tar.gz, so we can run a simple shell command to extract
    # the contents.
    for package in packages:
        # Each URI should look like: <content-type>/<package-name>
        # This path should exist: {work_dir}/{downloads}/{package_uri.split('/')[1]}
        # Extract to: {work_dir}/
        archiveName = package['uri'].split('/')[1]
        print("Extracting file {} to {}".format(archiveName, args.work_dir))
        path = os.path.join(args.work_dir, "downloads", archiveName)
        subprocess.call(['tar', '-xf', path, "-C", args.work_dir])


def handle_cone_update(coneType):
    print("Updating this {}-cone".format(coneType))
    # Ask the remote server which packages are available for the smart cone
    response = requests.get(
        'https://m0uulx094e.execute-api.us-west-2.amazonaws.com/default/FieldTrainerUpdateService/packages?type={}'.format(coneType))

    remotePackages = json.loads(response.text)

    # get the local versions -- if no file is present, we assume we need to update everything
    # Otherwise, look at every package we got from the web service against every local copy
    # if the local copy is missing or version is less than remote copy, we need to update
    packagesToUpdate = find_packages_to_update(remotePackages)
    download_all_packages(packagesToUpdate)
    extract_packages(packagesToUpdate)


# Handles the entire update flow for Field Cones


def handle_field_cone_update():
    pass


args = parser.parse_args()

# Anything which needs to happen before running the installer


def pre_work():
    try:
        # Create the work dir and any nested directories needed
        os.makedirs(args.work_dir)
        os.makedirs('{}/downloads'.format(args.work_dir))
    except FileExistsError:
        # no problem
        pass
    except Exception as err:
        print("Failed to create work dirs. Error message: {}".format(err))


if __name__ == "__main__":
    # need to figure out if we are running on a smart cone
    # or a field cone. From there, we can ask the remote server
    # which packages are available, then we can query our own filesystem
    # and figure out what versions we have. If we are missing any installed
    # versions (new cone or new package), we download them and install
    # If we are behind in version on any packages, we download and install

    # Each package comes with a script which knows how to install the package

    try:
        pre_work()

        cone_type = get_cone_type()
        try:
            handle_cone_update(cone_type)
        except Exception as error:
            print(error)
    except Exception as error:
        print(error)
        sys.exit(-1)
