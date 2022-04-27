import React from 'react'
import './App.scss'
import {App} from '@control-ui/app/App'
import {routes} from './routes'
import {DocsProvider} from '@control-ui/docs/DocsProvider'
import {HeadlinesProvider} from '@control-ui/docs/LinkableHeadline'
import merge from 'webpack-merge'
import {loading} from './component/Loading'
import {CustomLayout} from './component/Layout'
import {SearchProvider} from './component/SearchProvider'

const Provider = ({children}) => (
    <DocsProvider loader={(file) => import('./content/' + file + '.md')}>
        <SearchProvider indexUrl={'docs-component/index.json'}>
            <HeadlinesProvider>
                {children}
            </HeadlinesProvider>
        </SearchProvider>
    </DocsProvider>
)

const l10n = {ns: {de: {}}}

const i18n = {
    allLanguages: {
        en: '0.1',
    },
    detection: ['localStorage'],
    defaultLanguage: 'en',
    loader: (url) => import ('./locales/' + url + '.json'),
    parse: (lng, ns, data) => {
        // if that namespace got hardcoded overwrites from consuming app, overwrite included locales with app locales
        if(l10n && l10n[lng] && l10n[lng][ns]) {
            data = {...data}
            data = merge(data, i18n[lng][ns])
        }

        return data
    },
}

const routing = routes(loading)
const CustomApp = () => <App
    routes={routing}
    Layout={CustomLayout}
    i18n={i18n}
    Provider={Provider}
/>

export default CustomApp
