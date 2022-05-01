import { Route } from '@control-ui/routes'

export function flattenRoutes<R extends Route = Route, F = any>(
    route: R,
    filter: (route: R) => boolean,
    flatter: (route: R, parent: F | undefined, parentRoute: R | undefined) => F,
    parent?: F,
    parentRoute?: R,
    found: F[] = [],
): F[] {
    const flat = flatter(route, parent, parentRoute)
    if(filter(route)) {
        found.push(flat)
    }

    if(route.routes) {
        route.routes.forEach(r =>
            flattenRoutes<R>(r as R, filter, flatter, flat, route, found))
    }

    return found
}
