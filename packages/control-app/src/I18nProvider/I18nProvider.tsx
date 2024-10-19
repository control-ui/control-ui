import React from 'react'

import i18n from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'

import Backend from 'i18next-chained-backend'
import HttpBackend, { HttpBackendOptions } from 'i18next-http-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

export type i18nLoader<T> = (url: string) => Promise<T>
// export type i18nParse = HttpBackendOptions['parse']

export type i18nDetections = 'path' | 'localStorage'

export interface I18nProviderContext {
    allLanguages: { [key: string]: string }
    detection?: i18nDetections[]
    loader: i18nLoader<any>
    expiration?: number
    pathIndex?: number
    // parse?: i18nParse
    debug?: boolean
    langFallback?: string[]
}

const html: HTMLHtmlElement | null = document.querySelector('html')

export class I18nProvider extends React.Component<React.PropsWithChildren<I18nProviderContext>> {
    constructor(props: React.PropsWithChildren<I18nProviderContext>) {
        super(props)

        const {
            allLanguages, langFallback,
            detection = ['path', 'localStorage'],
            loader, expiration, pathIndex = 0, // parse,
            debug,
        } = this.props

        // const defaultLanguage = i18n && i18n.languages && i18n.languages[0] ? i18n.languages[0] : this.props.defaultLanguage

        // load translation using xhr -> see /public/locales
        // learn more: https://github.com/i18next/i18next-xhr-backend
        i18n
            .use(Backend)
            // detect user language
            // learn more: https://github.com/i18next/i18next-browser-languageDetector
            .use(LanguageDetector)
            // pass the i18n instance to the react-i18next components.
            // Alternative use the I18nextProvider: https://react.i18next.com/components/i18nextprovider
            .use(initReactI18next)
            // init i18next
            // for all options read: https://www.i18next.com/overview/configuration-options
            .init({
                // lng: defaultLanguage,
                supportedLngs: [
                    ...Object.keys(allLanguages),
                    ...Array.isArray(langFallback) ?
                        langFallback.filter(l => !(l in (allLanguages || {}))) :
                        langFallback && !(langFallback in (allLanguages || {})) ? [langFallback] : [],
                ],

                // i18n config
                debug,
                fallbackLng: langFallback,
                initImmediate: false,

                // `ns` and `defaultNS` must be `common` otherwise `translation.json` is still being loaded sometimes
                ns: 'common',
                defaultNS: 'common',
                fallbackNS: 'common',

                interpolation: {
                    escapeValue: false, // not needed for react as it escapes by default
                },

                // special options for react-i18next
                // learn more: https://react.i18next.com/latest/i18next-instance
                react: {bindI18n: 'languageChanged'},

                detection: {
                    order: detection,

                    lookupLocalStorage: 'i18nextLng',
                    lookupFromPathIndex: pathIndex,

                    // cache user language on
                    caches: ['localStorage'],
                    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
                },

                backend: {
                    backends: [
                        LocalStorageBackend, // primary
                        HttpBackend, // fallback
                        // todo: instead of HttpBackend, the i18next-resources-to-backend should be enough
                    ],
                    backendOptions: [{
                        // prefix for stored languages
                        prefix: 'i18next_res_',

                        // expiration
                        expirationTime: expiration,

                        // language versions
                        versions: allLanguages,
                    }, {
                        // path where resources get loaded from, or a function
                        // returning a path:
                        // function(lng, namespaces) { return customPath; }
                        // the returned path will interpolate lng, ns if provided like giving a static path
                        loadPath: (/*lng: string[]/*namespaces*/) => {
                            return '{{lng}}/{{ns}}'
                        },

                        // path to post missing resources
                        //addPath: 'locales/add/{{lng}}/{{ns}}',

                        // your backend server supports multiloading
                        // /locales/resources.json?lng=de+en&ns=ns1+ns2
                        allowMultiLoading: false, // set loadPath: '/locales/resources.json?lng={{lng}}&ns={{ns}}' to adapt to multiLoading

                        // todo: parse is not handled with custom `request`
                        // parse data after it has been fetched
                        // parse: parse,

                        // allow cross domain requests
                        crossDomain: false,

                        // allow credentials on cross domain requests
                        withCredentials: false,

                        /**
                         * define a custom load function
                         */
                        request: (...[/*options*/, url, /*payload*/, callback]: Parameters<NonNullable<HttpBackendOptions['request']>>) => {
                            try {
                                loader(url).then(data => {
                                    callback(null, {status: 200, data: data})
                                })
                            } catch(e) {
                                console.error(e)
                                callback(e, {status: 404, data: {}})
                            }
                        },

                        // adds parameters to resource URL. 'example.com' -> 'example.com?v=1.3.5'
                        //queryStringParams: {v: '1.3.5'}
                    }],
                },
            })

        this.state = {lng: i18n.language}
    }

    componentDidMount(): void {
        if(html && i18n.language) {
            html.lang = i18n.language
        }

        i18n.on('languageChanged', this.changeHtml)
    }

    componentWillUnmount(): void {
        i18n.off('languageChanged', this.changeHtml)
    }

    changeHtml(lng: string): void {
        if(html) {
            html.lang = lng
        }
    }

    render(): React.ReactElement {
        return <I18nextProvider i18n={i18n}>
            {this.props.children}
        </I18nextProvider>
    }
}
