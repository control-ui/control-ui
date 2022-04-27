import React from 'react'
import {
    BrowserRouter as Router,
} from 'react-router-dom'
import { I18nProvider, I18nProviderContext } from '../I18nProvider'
import { DrawerProvider } from '../DrawerProvider'
import { RouterProvider, Route } from '../RouterProvider'

const DefaultProvider = ({routes, children}: React.PropsWithChildren<{ routes: Route }>) => (
    <RouterProvider routes={routes}>
        <DrawerProvider>
            {children}
        </DrawerProvider>
    </RouterProvider>
)

export interface AppProps {
    Layout: React.ComponentType
    Provider?: React.ComponentType
    routes: Route
    i18n: I18nProviderContext
    routerBasename?: string
}

export const App: React.ComponentType<AppProps> = (
    {
        Layout, Provider, routes,
        i18n, routerBasename = '/',
    },
) => {
    return <Router basename={routerBasename}>
        <I18nProvider {...i18n}>
            <React.Suspense fallback={null}>
                <DefaultProvider routes={routes}>
                    {Provider ?
                        <Provider>
                            <Layout/>
                        </Provider> :
                        <Layout/>}
                </DefaultProvider>
            </React.Suspense>
        </I18nProvider>
    </Router>
}
