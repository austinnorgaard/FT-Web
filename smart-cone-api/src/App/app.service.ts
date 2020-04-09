import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as util from "util";
// SmartConeInfo represents known information about the SmartCone

const readFile = util.promisify(fs.readFile);

export interface Package {
    name: string;
    version: number;
}

export class SmartConeInfo {
    packages: Array<Package>;
}


interface BuildsJsonSchema {
    packages: Array<PackageJsonSchema>;
}

interface PackageJsonSchema {
    name: string;
    version: number;
}

@Injectable()
export class AppService {
    constructor(){}

    async getSmartConeInfo(): Promise<SmartConeInfo> {
        // Build the smart cone information by querying local state
        let smartConeInfo: SmartConeInfo = new SmartConeInfo();
        smartConeInfo.packages = await this.getPackages();
        return smartConeInfo;
    }

    private async getPackages(): Promise<Array<Package>> {
        // packages are found in /var/tmp/builds.json. If package is not found
        // we can just return an empty array
        if (!fs.existsSync('/var/tmp/builds.json')) {
            return [];
        }

        // Otherwise, read into a string the build contents, parse into our package format
        const fileContents = (await readFile('/var/tmp/builds.json')).toString();

        const localPackages: BuildsJsonSchema = JSON.parse(fileContents);

        let packages: Array<Package> = [];

        localPackages.packages.forEach(p => {
            packages.push({
                name: p.name,
                version: p.version
            });
        });

        return packages;
    }

}
