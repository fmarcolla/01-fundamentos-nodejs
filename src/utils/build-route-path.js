// /users:id

export function buildRoutePath(path){
    const routeParametersRegex = /:([a-zA-z]+)/g
    const pathWithParams = String(path).replace(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)');

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

    return pathRegex;
}