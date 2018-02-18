// Set this field to the IP of the start-cone or device hosting the front-end
export const start_cone_ip = "192.168.1.8";

// The port the front-end website is hosted on
export const front_end_port = "4200";

// The port the smart_cone is hosting their http server on
export const smart_cone_api_http_port = "3000";

// The port the smart_cone is hosting the cone_api server on (cone -> smart_cone)
export const cone_api_socket_port = "3001";

// The port the smart_cone is hosting the smart_cone_api server on (front-end -> smart_cone)
export const smart_cone_api_socket_port = "3002";

// The port each cone (except the smart_cone) is hosting their http server on
export const cone_api_http_port = "3100";

// Given a route, returns the correct path to the start cone's http server
export function toSmartConeHttp(route = "/"): string {
    return `http://${start_cone_ip}:${smart_cone_api_http_port}${route}`;
}

export function getSmartConeApiSocketUrl(): string {
    return `http://${start_cone_ip}:${smart_cone_api_socket_port}`;
}
