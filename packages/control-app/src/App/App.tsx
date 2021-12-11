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

export function App(
    {
        Layout, Provider, routes,
        i18n, routerBasename = '/',
    }: AppProps,
): React.ReactElement {
    return <Router basename={routerBasename}>
        <I18nProvider
            allLanguages={i18n.allLanguages}
            defaultLanguage={i18n.defaultLanguage}
            detection={i18n.detection}
            pathIndex={i18n.pathIndex}
            loader={i18n.loader}
            // eslint-disable-next-line
            expiration={process.env.NODE_ENV === 'production' ? 2 * 24 * 60 * 60 * 1000 : 100}
            debug={i18n.debug}
            parse={i18n.parse}
        >
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
