import React from 'react'
import { Route, RouteNav } from '@control-ui/routes'

export interface RouterProviderContext<C = any, N extends RouteNav = RouteNav> {
    routes: Route<C, N>
}

const RouterContext = React.createContext<RouterProviderContext>({routes: {routes: []}})

export function useRouter<C = any, N extends RouteNav = RouteNav>(): RouterProviderContext<C, N> {
    return React.useContext(RouterContext) as unknown as RouterProviderContext<C, N>
}

export const RouterProvider = <C, N extends RouteNav = RouteNav>({children, routes}: React.PropsWithChildren<RouterProviderContext<C, N>>): React.ReactElement => {
    return <RouterContext.Provider value={{routes}}>
        {children}
    </RouterContext.Provider>
}
