import React from 'react'
import { App } from '@control-ui/app/App'
import { routes } from './routes'
import { DocsProvider } from '@control-ui/docs/DocsProvider'
import { HeadlinesProvider } from '@control-ui/docs/LinkableHeadline'
import merge from 'webpack-merge'
import { CustomLayout } from './component/Layout'
import { BrowserRouter } from 'react-router-dom'
import { DocsIndexProvider } from '@control-ui/docs/DocsIndexProvider'
import { DocsSearchProvider } from '@control-ui/docs/DocsSearchProvider'
import { I18nProviderContext } from '@control-ui/app'
import { loadableLoading } from '@control-ui/kit/LoadableLoading'
import { LoadingCircular } from '@control-ui/kit/Loading'

const indexRefs = {
    modules: 'docs/index-modules.json',
    pages: 'docs/index-pages.json',
}

const docsLoader = (file: string): Promise<string> => import('./content/' + file + '.md')

const Provider: React.ComponentType<React.PropsWithChildren<{}>> = ({children}) => (
    <DocsProvider loader={docsLoader}>
        <DocsIndexProvider indexRefs={indexRefs}>
            <DocsSearchProvider localKey={'cui-search-history'} bindKey={'k'}>
                <HeadlinesProvider>
                    {children}
                </HeadlinesProvider>
            </DocsSearchProvider>
        </DocsIndexProvider>
    </DocsProvider>
)

const l10n: { [namespace: string]: { [language: string]: any } } = {common: {en: {}}}

const i18n: I18nProviderContext = {
    allLanguages: {
        en: '0.1',
    },
    detection: ['localStorage'],
    loader: (url) =>
        import ('./locales/' + url + '.json')
            .then((res) => {
                const [language, namespace] = url.split('/')
                if(l10n && l10n[namespace] && l10n[namespace][language]) {
                    return merge({...res}, l10n[namespace][language])
                }
                return res
            }),
}

const routing = routes(loadableLoading(LoadingCircular))
const CustomApp = () =>
    <BrowserRouter basename={'/'}>
        <App
            routes={routing}
            Layout={CustomLayout}
            i18n={i18n}
            Provider={Provider}
        />
    </BrowserRouter>

export default CustomApp
