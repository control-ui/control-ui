import { Route } from '@control-ui/routes/Route'

export function filterRoutes<R extends Route = Route>(
    route: R,
    filter: (route: R) => boolean,
    found: R[] = [],
): R[] {
    if(filter(route)) {
        found.push(route)
    }

    if(route.routes) {
        route.routes.forEach(route =>
            filterRoutes<R>(route as R, filter, found))
    }

    return found
}
