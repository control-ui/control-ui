import { LoadableLazy, LoadableLazy2 } from '@control-ui/kit/LoadableLazy'
import { lazy } from 'react'
import { docsKit, docsDocs, docsHowTo, docsApp, docsRoutes, docsMdMui, docsDocsTs } from './content/docs'
import { Route } from '@control-ui/routes/Route'

const LazyDocsDetails = lazy(() => import('./page/DocsDetails'))

const createDocsTree = <R extends Route = Route>(scope: string, label: string, routes?: R[], loadingTitle?: string, toSection?: RegExp): Route => ({
    path: '/' + scope + '/:docId+',
    nav: {
        to: '/' + scope,
        label,
        initialOpen: false,
        toSection,
    },
    config: {
        content: {
            component: LoadableLazy2({
                LazyComp: LazyDocsDetails,
                title: loadingTitle,
            }),
        },
    },
    routes,
})

export const routes = (): Route => ({
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
                    component: LoadableLazy({
                        loader: () => import('./page/PageHome'),
                        title: 'Loading Home',
                    }),
                },
            },
        },
        createDocsTree('how-to', 'How-Tos', docsHowTo(''), 'Loading Docs'),
        createDocsTree('app', '@control-ui/app', docsApp(''), 'Loading Docs'),
        createDocsTree('kit', '@control-ui/kit', docsKit(''), 'Loading Docs'),
        createDocsTree('docs', '@control-ui/docs', docsDocs(''), 'Loading Docs'),
        createDocsTree('docs-ts', '@control-ui/docs-ts', docsDocsTs(''), 'Loading Docs'),
        createDocsTree('routes', '@control-ui/routes', docsRoutes(''), 'Loading Docs'),
        createDocsTree('md', '@control-ui/md', docsMdMui(''), 'Loading Docs'),
    ],
})
