import Loadable from 'react-loadable'
import { docsKit, docsDocs, docsHowTo, docsApp, docsRoutes, docsMdMui, docsDocsTs } from './content/docs'
import { Route } from '@control-ui/routes/Route'

const createDocsTree = <R extends Route = Route>(scope: string, label: string, routes?: R[], loading?: any): Route => ({
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

export const routes = (loading: (title: string) => any): Route => ({
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
        createDocsTree('app', '@control-ui/app', docsApp(''), loading('Loading Docs')),
        createDocsTree('kit', '@control-ui/kit', docsKit(''), loading('Loading Docs')),
        createDocsTree('docs', '@control-ui/docs', docsDocs(''), loading('Loading Docs')),
        createDocsTree('docs-ts', '@control-ui/docs-ts', docsDocsTs(''), loading('Loading Docs')),
        createDocsTree('routes', '@control-ui/routes', docsRoutes(''), loading('Loading Docs')),
        createDocsTree('md', '@control-ui/md', docsMdMui(''), loading('Loading Docs')),
    ],
})
