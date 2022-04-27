const createDoc = (path, label, routes, prefix, module) => ({
    doc: path,
    path: prefix + '/' + path,
    nav: {
        to: prefix + '/' + path,
        initialOpen: false,
        label,
    },
    docModule: module,
    routes,
})

const compCreator = (prefix) =>
    (path, label = undefined, routes = undefined, module = undefined) =>
        createDoc(prefix + '/' + path, label || path, routes, '', module)

export const docsHowTo = (prefix = '') => [
    createDoc('how-to/overview', 'How-To Overview', undefined, prefix),
]

const compApp = compCreator('app/components')
export const docsApp = (prefix = '') => [
    createDoc('app/overview', 'App Overview', undefined, prefix),
    createDoc('app/components', 'Components', [
        compApp('App', undefined, undefined, {package: '@control-ui/app', fromPath: 'App'}),
        compApp('AppLoader', undefined, undefined, {package: '@control-ui/app', fromPath: 'AppLoader'}),
        compApp('AppTheme', undefined, undefined, {package: '@control-ui/app', fromPath: 'AppTheme'}),
        compApp('Drawer', undefined, undefined, {package: '@control-ui/app', fromPath: 'Drawer'}),
        compApp('DrawerProvider', undefined, undefined, {package: '@control-ui/app', fromPath: 'DrawerProvider'}),
        compApp('Footer', undefined, undefined, {package: '@control-ui/app', fromPath: 'Footer'}),
        compApp('Header', undefined, undefined, {package: '@control-ui/app', fromPath: 'Header'}),
        compApp('I18nProvider', undefined, undefined, {package: '@control-ui/app', fromPath: 'I18nProvider'}),
        compApp('Layout', undefined, undefined, {package: '@control-ui/app', fromPath: 'Layout'}),
        compApp('RouteCascade', undefined, undefined, {package: '@control-ui/app', fromPath: 'RouteCascade'}),
        compApp('RouterProvider', undefined, undefined, {package: '@control-ui/app', fromPath: 'RouterProvider'}),
    ], prefix),
]

const compKit = compCreator('kit/components')
export const docsKit = (prefix = '') => [
    createDoc('kit/overview', 'Kit Overview', undefined, prefix),
    createDoc('kit/components', 'Components', [
        compKit('DataGrid', undefined, undefined, {package: '@control-ui/kit', fromPath: 'DataGrid'}),
        compKit('ExpansionPanel', undefined, undefined, {package: '@control-ui/kit', fromPath: 'ExpansionPanel'}),
        compKit('Link', undefined, undefined, {package: '@control-ui/kit', fromPath: 'Link'}),
        compKit('List', undefined, undefined, {package: '@control-ui/kit', fromPath: 'List'}),
        compKit('Loading', undefined, undefined, {package: '@control-ui/kit', fromPath: 'Loading'}),
        compKit('Menu', undefined, undefined, {package: '@control-ui/kit', fromPath: 'Menu'}),
        compKit('PageContent', undefined, undefined, {package: '@control-ui/kit', fromPath: 'PageContent'}),
        compKit('Process', undefined, undefined, {package: '@control-ui/kit', fromPath: 'Process'}),
        compKit('Route', undefined, undefined, {package: '@control-ui/kit', fromPath: 'Route'}),
        compKit('ScrollUpButton', undefined, undefined, {package: '@control-ui/kit', fromPath: 'ScrollUpButton'}),
        compKit('Settings', undefined, undefined, {package: '@control-ui/kit', fromPath: 'Settings'}),
        compKit('Tooltip', undefined, undefined, {package: '@control-ui/kit', fromPath: 'Tooltip'}),
    ], prefix),
]

const compDocs = compCreator('docs/components')
export const docsDocs = (prefix = '') => [
    createDoc('docs/overview', 'Docs Overview', undefined, prefix),
    createDoc('docs/components', 'Components', [
        compDocs('ContentLoader', undefined, undefined, {package: '@control-ui/docs', fromPath: 'ContentLoader'}),
        compDocs('DocDetails', undefined, undefined, {package: '@control-ui/docs', fromPath: 'DocDetails'}),
        compDocs('DocsProvider', undefined, undefined, {package: '@control-ui/docs', fromPath: 'DocsProvider'}),
        compDocs('LinkableHeadline', undefined, undefined, {package: '@control-ui/docs', fromPath: 'LinkableHeadline'}),
        compDocs('Markdown', undefined, undefined, {package: '@control-ui/docs', fromPath: 'Markdown'}),
    ], prefix),
]

export const docsLocales = (prefix = '') => [
    createDoc('locales/overview', 'Locales Overview', undefined, prefix),
]
