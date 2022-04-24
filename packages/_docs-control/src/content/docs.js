const createDoc = (path, label, routes, prefix) => ({
    doc: path,
    path: prefix + '/' + path,
    nav: {
        to: prefix + '/' + path,
        initialOpen: false,
        label,
    },
    routes,
})

const compCreator = (prefix) => (path, label = undefined, routes = undefined) => createDoc(prefix + '/' + path, label || path, routes, '')

export const docsHowTo = (prefix = '') => [
    createDoc('how-to/overview', 'How-To Overview', undefined, prefix),
]

const compApp = compCreator('app/components')
export const docsApp = (prefix = '') => [
    createDoc('app/overview', 'App Overview', undefined, prefix),
    createDoc('app/components', 'Components', [
        compApp('App'),
        compApp('AppLoader'),
        compApp('AppTheme'),
        compApp('Drawer'),
        compApp('DrawerProvider'),
        compApp('Footer'),
        compApp('Header'),
        compApp('I18nProvider'),
        compApp('Layout'),
        compApp('RouteCascade'),
        compApp('RouterProvider'),
    ], prefix),
]

const compKit = compCreator('kit/components')
export const docsKit = (prefix = '') => [
    createDoc('kit/overview', 'Kit Overview', undefined, prefix),
    createDoc('kit/components', 'Components', [
        compKit('DataGrid'),
        compKit('ExpansionPanel'),
        compKit('Link'),
        compKit('List'),
        compKit('Loading'),
        compKit('Menu'),
        compKit('PageContent'),
        compKit('Process'),
        compKit('Route'),
        compKit('ScrollUpButton'),
        compKit('Settings'),
        compKit('Tooltip'),
    ], prefix),
]

const compDocs = compCreator('docs/components')
export const docsDocs = (prefix = '') => [
    createDoc('docs/overview', 'Docs Overview', undefined, prefix),
    createDoc('docs/components', 'Components', [
        compDocs('ContentLoader'),
        compDocs('DocDetails'),
        compDocs('DocsProvider'),
        compDocs('LinkableHeadline'),
        compDocs('Markdown'),
    ], prefix),
]

export const docsLocales = (prefix = '') => [
    createDoc('locales/overview', 'Locales Overview', undefined, prefix),
]
