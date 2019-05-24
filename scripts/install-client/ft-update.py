#!/usr/bin/env python3

import requests
import sys
import json
import boto3


def get_cone_type():
    # We are assuming that fieldcones are running the Pi zero
    # and smart cones are _anything_ else as we've supported
    # two different platforms thus far
    with open('/proc/device-tree/model') as model_file:
        text = model_file.read()
        if 'Pi Zero' in text:
            return 'field'
        else:
            return 'smart'
    raise "Could not figure out cone type!"


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


def downloadAllPackages(packages):
    s3 = boto3.client('s3')

    for package in packages:
        print("Downloading package {}. URI: {}".format(
            package['name'], package['uri']))
        s3.download_file('field-trainer-builds',
                         package['uri'], '/home/pi/{}.tar.gz'.format(package['name']))


def handle_smart_cone_update():
    # Ask the remote server which packages are available for the smart cone
    response = requests.get(
        'https://m0uulx094e.execute-api.us-west-2.amazonaws.com/default/FieldTrainerUpdateService/packages?type=smart')

    remotePackages = json.loads(response.text)

    # get the local versions -- if no file is present, we assume we need to update everything
    # Otherwise, look at every package we got from the web service against every local copy
    # if the local copy is missing or version is less than remote copy, we need to update
    packagesToUpdate = find_packages_to_update(remotePackages)
    downloadAllPackages(packagesToUpdate)


# Handles the entire update flow for Field Cones


def handle_field_cone_update():
    pass


if __name__ == "__main__":
    # need to figure out if we are running on a smart cone
    # or a field cone. From there, we can ask the remote server
    # which packages are available, then we can query our own filesystem
    # and figure out what versions we have. If we are missing any installed
    # versions (new cone or new package), we download them and install
    # If we are behind in version on any packages, we download and install

    # Each package comes with a script which knows how to install the package

    try:
        cone_type = get_cone_type()
        try:
            if cone_type == 'smart':
                print("Doing smart cone update flow")
                handle_smart_cone_update()
            elif cone_type == 'field':
                print("Doint field cone update flow")
                handle_field_cone_update()
        except Exception as error:
            print(error)
    except Exception as error:
        print(error)
        sys.exit(-1)
