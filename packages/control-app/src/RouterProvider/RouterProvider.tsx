import React from 'react'

export interface routeComponent<T> {
    exact?: boolean
    component: Promise<T>
}

export interface RouteNav {
    to: string
    label: string
    divider?: boolean
    initialOpen?: boolean
    icon?: any
}

export interface Route {
    'path'?: string
    nav?: RouteNav
    routes?: Route[]
}

export interface RouterProviderContext {
    routes: Route
}

const RouterContext = React.createContext<RouterProviderContext>({routes: {routes: []}})

export const useRouter = (): RouterProviderContext => {
    return React.useContext(RouterContext)
}

export const RouterProvider = ({children, routes}: React.PropsWithChildren<RouterProviderContext>): React.ReactElement => {
    return <RouterContext.Provider value={{routes}}>
        {children}
    </RouterContext.Provider>
}

export const filterRoutes = (route: Route, filter: (route: Route) => boolean, found: Route[] = []): Route[] => {
    if (filter(route)) {
        found.push(route)
    }

    if (route.routes) {
        route.routes.forEach(route =>
            filterRoutes(route, filter, found))
    }

    return found
}
