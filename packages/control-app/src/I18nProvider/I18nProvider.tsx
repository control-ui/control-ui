import React from 'react'

import i18n from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'

import Backend from 'i18next-chained-backend'
import XHR from 'i18next-xhr-backend'
import LocalStorageBackend from 'i18next-localstorage-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

export type i18nLoader<T> = (url: string) => Promise<T>
export type i18nParse = (lng: string, ns: string, data: {}) => {}

export type i18nDetections = 'path' | 'localStorage'

export interface I18nProviderContext {
    allLanguages: { [key: string]: string }
    detection?: i18nDetections[]
    loader: i18nLoader<any>
    expiration?: number
    pathIndex?: number
    parse?: i18nParse
    debug?: boolean
    defaultLanguage: string
}

const html: HTMLHtmlElement | null = document.querySelector('html')

export class I18nProvider extends React.Component<React.PropsWithChildren<I18nProviderContext>> {
    constructor(props: React.PropsWithChildren<I18nProviderContext>) {
        super(props)

        const {allLanguages, detection = ['path', 'localStorage'], loader, expiration, pathIndex = 0, parse, debug} = this.props

        const defaultLanguage = i18n && i18n.languages && i18n.languages[0] ? i18n.languages[0] : this.props.defaultLanguage

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
                // allLanguages, debug, defaultLanguage are custom options not default by i18n, used to setup components based on i18n setup
                // @ts-ignore
                allLanguages: Object.keys(allLanguages),
                defaultLanguage: defaultLanguage,

                // i18n config
                debug,
                // eslint-disable-next-line
                fallbackLng: defaultLanguage,
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
                        XHR, // fallback
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
                        loadPath: (lng: string[]/*namespaces*/) => {
                            // we use react dyn. imports so only one language per load
                            if (!allLanguages[lng[0]]) {
                                // when wanted language is not known, return hard default language
                                console.error('i18n tried to load non existing language, loading default instead, tried: ', lng[0])
                                return defaultLanguage + '/{{ns}}'
                            }
                            return '{{lng}}/{{ns}}'
                        },

                        // path to post missing resources
                        //addPath: 'locales/add/{{lng}}/{{ns}}',

                        // your backend server supports multiloading
                        // /locales/resources.json?lng=de+en&ns=ns1+ns2
                        allowMultiLoading: false, // set loadPath: '/locales/resources.json?lng={{lng}}&ns={{ns}}' to adapt to multiLoading

                        // parse data after it has been fetched
                        // in example use https://www.npmjs.com/package/json5
                        parse: (data: any, ident: string) => {
                            const identArr = ident.split('/')
                            const lng = identArr[0]
                            const ns = identArr[1]

                            if (parse) return parse(lng, ns, data)

                            return data
                        },

                        // allow cross domain requests
                        crossDomain: false,

                        // allow credentials on cross domain requests
                        withCredentials: false,

                        /**
                         * define a custom xhr function
                         *
                         * @param {string} url the value of 'loadPath'
                         * @param {{}} _options the options object passed to i18n backend init
                         * @param {function} callback is a function that takes two parameters, 'data' and 'xhr'.
                         *                 - 'data' should be the key:value translation pairs for the
                         *                   requested language and namespace, or null in case of an error.
                         *                 - 'xhr' should be a status object, e.g. { status: 200 }
                         * @param {{}} data will be a key:value object used when saving missing translations
                         */
                        ajax: (url: string, _options: {}, callback: Function /*data*/) => {
                            try {
                                loader(url).then(data => {
                                    callback(data, {status: '200'})
                                })
                            } catch (e) {
                                console.error(e)
                                callback(null, {status: '404'})
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
        if (html) {
            // @ts-ignore
            html.lang = i18n.options.defaultLanguage
        }

        i18n.on('languageChanged', this.changeHtml)
    }

    componentWillUnmount(): void {
        i18n.off('languageChanged', this.changeHtml)
    }

    changeHtml(lng: string): void {
        if (html) {
            html.lang = lng
        }
    }

    render(): React.ReactElement {
        return <I18nextProvider i18n={i18n}>
            {this.props.children}
        </I18nextProvider>
    }
}
