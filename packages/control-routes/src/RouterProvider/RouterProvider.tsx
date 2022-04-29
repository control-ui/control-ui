import React from 'react'
import { Route } from '@control-ui/routes'

export interface RouterProviderContext<C = any> {
    routes: Route<C>
}

const RouterContext = React.createContext<RouterProviderContext>({routes: {routes: []}})

export function useRouter<C = any>(): RouterProviderContext<C> {
    return React.useContext(RouterContext)
}

export const RouterProvider = <C, >({children, routes}: React.PropsWithChildren<RouterProviderContext<C>>): React.ReactElement => {
    return <RouterContext.Provider value={{routes}}>
        {children}
    </RouterContext.Provider>
}
