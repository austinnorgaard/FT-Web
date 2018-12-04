import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class HttpHelperService {
    public constructor(private http: HttpClient) {}

    /**
     * GET a resource from the smart cone HTTP server
     * @param path The URI of the resource, excluding the base path
     * @example
     * ```
     * let athletes: Athlete[] = httpHelperService.get<Athlete[]>('/athletes')
     * ```
     */
    async get<T>(path: string): Promise<T> {
        return this.http.get<T>(environment.config.toSmartConeHttp(path)).toPromise();
    }

    /**
     * POST an API endpoint on the smart cone HTTP server
     * @param path The URI of the API endpoint
     * @param body The required object for the URI
     * @param example
     * ```
     * let athlete = new Athlete('timmy');
     * let athletes = await httpHelperService.post<Athlete>('/athletes', athlete);
     * ```
     */
    async post<T>(path: string, body: any): Promise<T> {
        console.log("hello?");
        console.log(`${JSON.stringify(environment.config)}`);
        let test = environment.config.toSmartConeHttp(path);
        console.log(`Hey: ${environment.config.toSmartConeHttp(path)}`);
        return this.http.post<T>(environment.config.toSmartConeHttp(path), body).toPromise();
    }

    /**
     * Put a resource at a known location on the smart cone HTTP server
     * @param path The exact resource location
     * @param body The resource to PUT
     * @example
     * ```
     * let athlete = new Athlete('timmy', 42);
     * httpHelperService.put('/athletes/42', athlete);
     * ```
     */
    async put<T>(path: string, body: T): Promise<T> {
        return this.http.put<T>(environment.config.toSmartConeHttp(path), body).toPromise();
    }

    /**
     * Delete a resource at a given URI
     * @param path The path of the resource to delete
     * @example
     * ```
     * httpHelperService.delete('/athletes/42')
     * ```
     */
    async delete(path: string): Promise<any> {
        return this.http.delete(environment.config.toSmartConeHttp(path)).toPromise();
    }
}
