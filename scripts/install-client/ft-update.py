#!/usr/bin/env python3

import requests
import sys
import json
import boto3
import os
import time
import subprocess
import shutil
import socket
import traceback
from botocore.config import Config
from datetime import datetime

import argparse

parser = argparse.ArgumentParser(description="Field Trainer Update Client")
parser.add_argument('--work-dir', dest='work_dir', type=str, default="/home/pi/.ft-update",
                    help="Override updaters workdir, where packages will be installed")

# Specify the remote server IP. Default to our AWS installation, but you can change
# this in order to use a development environment
parser.add_argument('--remote_packages_host', dest='remote_packages_host', type=str, default="https://m0uulx094e.execute-api.us-west-2.amazonaws.com",
    help="Remote host from which to request the list of available remote packages. Can substitute a dev server IP for local packaging support (dev environment)")

parser.add_argument('--mode', dest='mode', type=str, default="prod", help="Pick between Production & Developer mode. Defaults to production mode", choices=['prod', 'dev'])

class LockFile():
    def __init__(self):
        self.lock_socket = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)

    def __enter__(self):
        self.lock_socket.bind('/var/tmp/ft_update_lock')

    def __exit__(self, type, value, traceback):
        print("Closing the lock socket!")
        try:
            self.lock_socket.close()
            os.unlink('/var/tmp/ft_update_lock')
        except:
            print("During closeLockSocket, got exception: {}".format(
                sys.exc_info()[0]))
            traceback.print_exc()

        print("Done closing the lock socket!")


class SysExitException(Exception):
    def __init__(self, error_code):
        self.error_code = error_code

    def get_error_code(self):
        return self.error_code


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


# Abstraction for file downloading. Use S3 in production environment,
# use requests otherwise (dev environment)
# All a user cares about is: Here's a path to download from and to
class FileDownloader():
    # type is either production or dev
    def __init__(self, type, s3=None, s3Bucket=''):
        self._type = type
        if type == 'dev':
            print("File downloader is in developer mode")
        else:
            print('File downloader is in production mode')
            if s3 == None:
                print('Programmer Error: User _must_ specify an s3 instance if they are in production mode!')
                raise SysExitException(1)
            self._s3 = s3

            if s3Bucket == '':
                print('Programmer error: User _must_ specify an s3 bucket if they are in production model!')
                raise SysExitException(1)
            self._s3Bucket = s3Bucket

    def download_file(self, url, path):
        print('Downloading file from URL {} to path {}'.format(url, path))
        if self._type == 'dev':
            self._download_file_requests(url, path)
        else:
            self._download_file_s3(url, path)

    def _download_file_s3(self, url, path):
        progress = ProgressPercentage(
            self._s3, self._s3Bucket, url)
        self._s3.download_file(self._s3Bucket,
                        url, path, Callback=progress)

    def _download_file_requests(self, url, path):
        download_file(url, path)


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

    print('Total number of remote packages: {}'.format(
        len(remotePackages['packages'])))

    # Start with the whole list of remote packages, remove any for which we have the latest
    # version as found in `localPackages`
    packagesToUpdate = []
    for remotePackage in remotePackages['packages']:
        packagesToUpdate.append(
            {'name': remotePackage['name'], 'uri': remotePackage['uri'], 'version': remotePackage['version']})

    for remotePackage in remotePackages['packages']:
        for localPackage in localPackages['packages']:
            try:
                if localPackage['name'] == remotePackage['name'] and localPackage['version'] >= remotePackage['version']:
                    packagesToUpdate = list((
                        package for package in packagesToUpdate if package['name'] != remotePackage['name']))

            except:
                pass

    print('List of packages which need an update: {}'.format(packagesToUpdate))
    return packagesToUpdate


def download_all_packages(packages):
    config = Config(s3={"use_accelerate_endpoint": True})
    s3_resource = boto3.resource("s3", region_name="us-west-2", config=config)

    s3 = s3_resource.meta.client

    downloader = FileDownloader('production', s3, 'field-trainer-builds') if args.mode == 'prod' else FileDownloader('dev')

    for package in packages:
        start = time.time()
        downloader.download_file(package['uri'], '{}/downloads{}'.format(args.work_dir, package['uri'].split('/')[1]))
        end = time.time()
        print('Time Elapsed: {}'.format(end - start))


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


def install_packages(packages):
    for package in packages:
        # construct the path to the install.sh script, change into this directory
        # run the script (all scripts assume they are being called in the same directory
        # as the package contents).
        basePath = os.path.join(args.work_dir, package['uri'].split('/')[0])
        scriptPath = os.path.join(basePath, "install.sh")
        print("Script path: {}".format(scriptPath))
        subprocess.call(['bash', scriptPath], cwd=basePath)


def update_local_builds(packages):
    # @packages refers to the packages we've just downloaded & installed
    # We can parse the file at: /var/tmp/builds.json, it contains an array of
    # dictionaries with name & version. We can check if any of the packages
    # we installed were already installed (prior version), or not installed already (missing)
    # and update the file accordingly

    # First -- if /var/tmp/builds.json doesn't exist, don't bother parsing it, just start with
    # an empty setup
    localJson = None
    if not os.path.isfile('/var/tmp/builds.json'):
        localJson = json.loads('{ "packages": [] }')
    else:
        localJson = read_json_file('/var/tmp/builds.json')

    name_found = False
    for package in packages:
        # iterate every package in the local json, see if we already have an entry for this
        for localPackage in localJson['packages']:
            if localPackage['name'] == package['name']:
                name_found = True
                localPackage['version'] = package['version']
        if not name_found:
            localJson['packages'].append(
                {"name": package["name"], "version": package["version"]})
        name_found = False

    with open('/var/tmp/builds.json', 'w+') as localFile:
        json.dump(localJson, localFile, indent=4)


def get_remote_packages(coneType):
    url = '{}/default/FieldTrainerUpdateService/packages?type={}'.format(args.remote_packages_host, coneType)
    response = requests.get(url)

    if response.status_code != 200:
        print('get_remote_packages: Failed to request remote packages. status code: {}'.format(response.status_code))
        sys.exit(1)

    try:
        return json.loads(response.text)
    except:
        print('get_remote_packages: failed to decode response text: {}'.format(response.text))


def handle_cone_update(coneType):
    print("Updating this {}-cone".format(coneType))
    # Ask the remote server which packages are available for the smart cone
    remotePackages = get_remote_packages(coneType)

    # get the local versions -- if no file is present, we assume we need to update everything
    # Otherwise, look at every package we got from the web service against every local copy
    # if the local copy is missing or version is less than remote copy, we need to update
    packagesToUpdate = find_packages_to_update(remotePackages)
    download_all_packages(packagesToUpdate)
    extract_packages(packagesToUpdate)
    install_packages(packagesToUpdate)
    update_local_builds(packagesToUpdate)


args = parser.parse_args()

# Anything which needs to happen before running the installer
def pre_work():
    try:
        try:
            # delete the entire work_dir from previous runs
            shutil.rmtree(args.work_dir)
        except:
            pass
        # Create the work dir and any nested directories I was thinking a decent idea wouldneeded
        os.makedirs(args.work_dir)
        os.makedirs('{}/downloads'.format(args.work_dir))
    except FileExistsError:
        # no problem
        pass
    except Exception as err:
        print("Failed to create work dirs. Error message: {}".format(err))


def update_script():
    # Pull all of the releases on FT-WEB repo, grab the latest release, compare its version
    # to our locally installed version, update if needed. If an update occurs, exit the script
    # with a specific error code so other processes know to rerun
    response = requests.get('https://api.github.com/repos/darrenmsmith/FT-WEB/releases/latest',
                            headers={'Authorization': 'Bearer {}'.format(os.environ['GH_API_KEY'])})
    if response.status_code != 200:
        print("Unable to query FT-WEB builds! Giving up now")
        raise SysExitException(1)

    body = response.json()
    print("Latest build published at: {}".format(body['published_at']))
    datePublished = datetime.strptime(
        body['published_at'].replace("Z", ""), "%Y-%m-%dT%H:%M:%S")

    needUpdate = False
    ourDate = ""
    # check our local copies version
    if not os.path.isfile("/var/tmp/ft-update-build"):
        print("/var/tmp/ft-update-build does not exist")
        needUpdate = True
    else:
        print('/var/tmp/ft-update-build exists')
        with open('/var/tmp/ft-update-build', 'r') as file:
            text = file.read()
            # Should be a date...
            ourDate = datetime.strptime(
                text.replace("Z", ""), "%Y-%m-%dT%H:%M:%S")

            print('Our date: {}'.format(ourDate))
            print('Published date: {}'.format(datePublished))

            if datePublished > ourDate:
                print('The published date is greater than local date')
                needUpdate = True
            else:
                print('The published date is less than local date')
                needUpdate = False

    if needUpdate:
        print("Need to update script!")
        do_update(body)
        with open('/var/tmp/ft-update-build', 'w+') as dateFile:
            dateFile.write(body['published_at'])
        # exit with exit code 42 to indicate that we needed to update
        # and the caller should rerun the script
        raise SysExitException(42)
    else:
        print("No need to update script!")


def do_update(body):
    print(body)
    # body is the already completed HTTP request which has the build info..
    downloadUrl = "https://api.github.com/repos/darrenmsmith/FT-WEB/releases/assets/{}".format(
        body['assets'][0]['id'])
    download_file(downloadUrl, '/home/pi/ft-update')
    # Script is a single executable, so just move it into /usr/local/bin
    # and the update is complete
    subprocess.call(
        ['sudo', 'mv', '-f', '/home/pi/ft-update', '/usr/local/bin'])
    subprocess.call(['sudo', 'chmod', '+x', '/usr/local/bin/ft-update'])


def download_file(url, path):
    with open(path, "wb") as f:
        print("Downloading {} to {}".format(url, path))
        response = requests.get(url, stream=True, headers={
            'Authorization': 'Bearer {}'.format(os.environ['GH_API_KEY']),
            'Accept': 'application/octet-stream'
        }, allow_redirects=True)
        totalLength = response.headers.get('content-length')

        if totalLength is None:  # no content length header
            print("No content length header")
            f.write(response.content)
        else:
            dl = 0
            totalLength = int(totalLength)
            for data in response.iter_content(chunk_size=4096):
                dl += len(data)
                f.write(data)


if __name__ == "__main__":

    # need to figure out if we are running on a smart cone
    # or a field cone. From there, we can ask the remote server
    # which packages are available, then we can query our own filesystem
    # and figure out what versions we have. If we are missing any installed
    # versions (new cone or new package), we download them and install
    # If we are behind in version on any packages, we download and install

    # Check if another instance is already running
    if os.path.exists('/var/tmp/ft_update_lock'):
        print("Another instance of the update tool is already running! Exiting cleanly.")
        sys.exit(0)

    try:
        with LockFile():
            # Each package comes with a script which knows how to install the package
            update_script()

            try:
                pre_work()

                cone_type = get_cone_type()
                try:
                    handle_cone_update(cone_type)
                except SysExitException as sysExit:
                    print('Got an exception request to exit with error code: {}'.format(sysExit.get_error_code()))
                    sys.exit(sysExit.get_error_code())
                except Exception as error:
                    print("Got an error while trying to do the cone update.")
                    print(error)
                    traceback.print_exc()

            except Exception as error:
                print('Exception: {}'.format(error))
                traceback.print_exc()
                sys.exit(-1)
    except SysExitException as sysExit:
        print('Got an exception request to exit with error code: {}'.format(sysExit.get_error_code()))
        sys.exit(sysExit.get_error_code())
    except:
        print("Error message: {}".format(sys.exc_info()[0]))
        traceback.print_exc()
