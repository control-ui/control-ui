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

export function filterRoutesNested<R extends Route = Route>(
    route: R,
    filter: (route: R) => boolean,
): R | undefined {
    let nestedRoutes: R[] | undefined
    if(route.routes) {
        nestedRoutes =
            route.routes.map(route => filterRoutesNested<R>(route as R, filter))
                // todo: try to remove the filter here
                .filter(r => typeof r !== 'undefined') as R[]
    }

    if(filter(route) || (nestedRoutes?.length || 0) > 0) {
        return ({...route, routes: nestedRoutes})
    }

    return undefined
}
