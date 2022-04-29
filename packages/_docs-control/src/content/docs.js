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
        compApp('AppThemeDynamic', undefined, undefined, {package: '@control-ui/app', fromPath: 'AppThemeDynamic'}),
        compApp('Drawer', undefined, undefined, {package: '@control-ui/app', fromPath: 'Drawer'}),
        compApp('DrawerProvider', undefined, undefined, {package: '@control-ui/app', fromPath: 'DrawerProvider'}),
        compApp('Footer', undefined, undefined, {package: '@control-ui/app', fromPath: 'Footer'}),
        compApp('Header', undefined, undefined, {package: '@control-ui/app', fromPath: 'Header'}),
        compApp('I18nProvider', undefined, undefined, {package: '@control-ui/app', fromPath: 'I18nProvider'}),
        compApp('Layout', undefined, undefined, {package: '@control-ui/app', fromPath: 'Layout'}),
    ], prefix),
]

const compKit = compCreator('kit/components')
export const docsKit = (prefix = '') => [
    createDoc('kit/overview', 'Kit Overview', undefined, prefix),
    createDoc('kit/components', 'Components', [
        compKit('DataGrid', undefined, undefined, {package: '@control-ui/kit', fromPath: 'DataGrid'}),
        compKit('ExpansionPanel', undefined, undefined, {package: '@control-ui/kit', fromPath: 'ExpansionPanel'}),
        compKit('HeadMeta', undefined, undefined, {package: '@control-ui/kit', fromPath: 'HeadMeta'}),
        compKit('Helper', undefined, undefined, {package: '@control-ui/kit', fromPath: 'Helper'}),
        compKit('Link', undefined, undefined, {package: '@control-ui/kit', fromPath: 'Link'}),
        compKit('List', undefined, undefined, {package: '@control-ui/kit', fromPath: 'List'}),
        compKit('Loading', undefined, undefined, {package: '@control-ui/kit', fromPath: 'Loading'}),
        compKit('NavList', undefined, undefined, {package: '@control-ui/kit', fromPath: 'NavList'}),
        compKit('PageContent', undefined, undefined, {package: '@control-ui/kit', fromPath: 'PageContent'}),
        compKit('RenderLink', undefined, undefined, {package: '@control-ui/kit', fromPath: 'RenderLink'}),
        compKit('ScrollUpButton', undefined, undefined, {package: '@control-ui/kit', fromPath: 'ScrollUpButton'}),
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

const compDocsTs = compCreator('docs-ts/components')
export const docsDocsTs = (prefix = '') => [
    createDoc('docs-ts/overview', 'Docs TS Overview', undefined, prefix),
    createDoc('docs-ts/components', 'Components', [
        compDocsTs('ModuleCode', undefined, undefined, {package: '@control-ui/docs-ts', fromPath: 'ModuleCode'}),
        compDocsTs('ModuleIntro', undefined, undefined, {package: '@control-ui/docs-ts', fromPath: 'ModuleIntro'}),
        compDocsTs('ModuleParams', undefined, undefined, {package: '@control-ui/docs-ts', fromPath: 'ModuleParams'}),
        compDocsTs('TsDocModule', undefined, undefined, {package: '@control-ui/docs-ts', fromPath: 'TsDocModule'}),
        compDocsTs('TsDocs', undefined, undefined, {package: '@control-ui/docs-ts', fromPath: 'TsDocs'}),
        compDocsTs('TsDocsModule', undefined, undefined, {package: '@control-ui/docs-ts', fromPath: 'TsDocsModule'}),
    ], prefix),
]

const compRoutes = compCreator('routes/components')
export const docsRoutes = (prefix = '') => [
    createDoc('routes/overview', 'Routes Overview', undefined, prefix),
    createDoc('routes/components', 'Components', [
        compRoutes('Route', undefined, undefined, {package: '@control-ui/routes', fromPath: 'Route'}),
        compRoutes('RouteCascade', undefined, undefined, {package: '@control-ui/routes', fromPath: 'RouteCascade'}),
        compRoutes('RouterProvider', undefined, undefined, {package: '@control-ui/routes', fromPath: 'RouterProvider'}),
        compRoutes('filterRoutes', undefined, undefined, {package: '@control-ui/routes', fromPath: 'filterRoutes'}),
    ], prefix),
]

const compMdMui = compCreator('md/components')
export const docsMdMui = (prefix = '') => [
    createDoc('md/overview', 'Markdown MUI Overview', undefined, prefix),
    createDoc('md/components', 'Components', [
        compMdMui('MarkdownRenderers', undefined, undefined, {package: '@control-ui/md', fromPath: 'MarkdownRenderers'}),
        compMdMui('MdBlockquote', undefined, undefined, {package: '@control-ui/md', fromPath: 'MdBlockquote'}),
        compMdMui('MdCode', undefined, undefined, {package: '@control-ui/md', fromPath: 'MdCode'}),
        compMdMui('MdHeading', undefined, undefined, {package: '@control-ui/md', fromPath: 'MdHeading'}),
        compMdMui('MdInlineCode', undefined, undefined, {package: '@control-ui/md', fromPath: 'MdInlineCode'}),
        compMdMui('MdLink', undefined, undefined, {package: '@control-ui/md', fromPath: 'MdLink'}),
        compMdMui('MdList', undefined, undefined, {package: '@control-ui/md', fromPath: 'MdList'}),
        compMdMui('MdTable', undefined, undefined, {package: '@control-ui/md', fromPath: 'MdTable'}),
    ], prefix),
]

export const docsLocales = (prefix = '') => [
    createDoc('locales/overview', 'Locales Overview', undefined, prefix),
]
