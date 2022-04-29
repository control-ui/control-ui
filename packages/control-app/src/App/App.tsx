import React from 'react'
import { I18nProvider, I18nProviderContext } from '@control-ui/app/I18nProvider'
import { DrawerProvider } from '@control-ui/app/DrawerProvider'
import { RouterProvider } from '@control-ui/routes/RouterProvider'
import { Route } from '@control-ui/routes/Route'

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
}

export const App: React.ComponentType<AppProps> = (
    {
        Layout, Provider, routes,
        i18n,
    },
) => {
    return <I18nProvider {...i18n}>
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
}
