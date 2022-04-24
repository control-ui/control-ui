import React from 'react'

//
// todo: unify interfaces in `app`/`kit`, currently `RouteComponent`, `RouteNav`, `Route` are duplicated
//

export interface RouteComponent<C> {
    exact?: boolean
    component: Promise<C>
}

export interface RouteNav {
    to: string
    toSection?: string | RegExp
    label: string
    divider?: boolean
    initialOpen?: boolean
    icon?: any
}

export interface Route<C = any> {
    'path'?: string
    nav?: RouteNav
    routes?: Route<C>[]
    config?: { [k: string]: RouteComponent<C> }
}

export interface RouterProviderContext<C = any> {
    routes: Route<C>
}

const RouterContext = React.createContext<RouterProviderContext>({routes: {routes: []}})

export function useRouter<C = any>(): RouterProviderContext<C> {
    return React.useContext(RouterContext)
}

export const RouterProvider = ({children, routes}: React.PropsWithChildren<RouterProviderContext>): React.ReactElement => {
    return <RouterContext.Provider value={{routes}}>
        {children}
    </RouterContext.Provider>
}

export const filterRoutes = (route: Route, filter: (route: Route) => boolean, found: Route[] = []): Route[] => {
    if(filter(route)) {
        found.push(route)
    }

    if(route.routes) {
        route.routes.forEach(route =>
            filterRoutes(route, filter, found))
    }

    return found
}
