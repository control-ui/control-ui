import * as Loadable from 'react-loadable'
import { docsKit, docsDocs, docsHowTo, docsApp, docsLocales } from './content/docs'
import { Route } from '@control-ui/app'

const createDocsTree = (scope: string, label: string, routes: any, loading: any): Route => ({
    path: '/' + scope + '/:docId+',
    nav: {
        to: '/' + scope,
        label,
        initialOpen: false,
    },
    config: {
        content: {
            component: Loadable({
                loader: () => import('./page/DocsDetails'),
                loading,
            }),
        },
    },
    routes,
})

export const routes = (loading: any): Route => ({
    routes: [
        {
            path: '/',
            nav: {
                to: '/',
                label: 'Home',
            },
            config: {
                content: {
                    exact: true,
                    component: Loadable({
                        loader: () => import('./page/PageMain'),
                        loading: loading('Loading Home'),
                    }),
                },
            },
        },
        createDocsTree('how-to', 'How-Tos', docsHowTo(''), loading('Loading Docs')),
        createDocsTree('app', 'Core: App', docsApp(''), loading('Loading Docs')),
        createDocsTree('kit', 'Core: Kit', docsKit(''), loading('Loading Docs')),
        createDocsTree('docs', 'Core: Docs', docsDocs(''), loading('Loading Docs')),
        createDocsTree('locales', 'Locales', docsLocales(''), loading('Loading Docs')),
    ],
})
