import { DocRoute } from '@control-ui/docs'
import { TsDocModule } from '@control-ui/docs-ts/TsDocModule'

export interface DocRouteModule extends DocRoute {
    docModule?: TsDocModule
}

const createDoc = (
    path: string,
    label: string,
    routes: DocRouteModule[] | undefined,
    prefix: string = '',
    module?: TsDocModule,
): DocRouteModule => ({
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

const compCreator = (prefix: string) =>
    (path: string, data: { routes?: DocRouteModule[], module: DocRouteModule['docModule'] }, label?: string) =>
        createDoc(prefix + '/' + path, label || path, data.routes, '', data.module)

export const docsHowTo = (prefix = '') => [
    createDoc('how-to/overview', 'How-To Overview', undefined, prefix),
]

const defineModule = (org: string, name: string, dir: string, from: string, customFiles?: string[]): TsDocModule => ({
    modulePath: `${dir}/src/${from}/`,
    relPath: `${dir}/src/${from}/`,
    package: `@${org}/${name}`,
    fromPath: from,
    files: customFiles ? customFiles : [from + '.tsx'],
})

const compApp = compCreator('app/components')
export const docsApp = (prefix = '') => [
    createDoc('app/overview', 'App Overview', undefined, prefix),
    createDoc('app/components', 'Components', [
        compApp('App', {
            module: defineModule('control-ui', 'app', 'control-app', 'App'),
        }),
        compApp('AppLoader', {
            module: defineModule('control-ui', 'app', 'control-app', 'AppLoader'),
        }),
        compApp('AppTheme', {
            module: defineModule('control-ui', 'app', 'control-app', 'AppTheme'),
        }),
        compApp('AppThemeDynamic', {
            module: defineModule('control-ui', 'app', 'control-app', 'AppThemeDynamic'),
        }),
        compApp('Drawer', {
            module: defineModule('control-ui', 'app', 'control-app', 'Drawer'),
        }),
        compApp('DrawerProvider', {
            module: defineModule('control-ui', 'app', 'control-app', 'DrawerProvider'),
        }),
        compApp('Footer', {
            module: defineModule('control-ui', 'app', 'control-app', 'Footer'),
        }),
        compApp('Header', {
            module: defineModule('control-ui', 'app', 'control-app', 'Header'),
        }),
        compApp('I18nProvider', {
            module: defineModule('control-ui', 'app', 'control-app', 'I18nProvider'),
        }),
        compApp('Layout', {
            module: defineModule('control-ui', 'app', 'control-app', 'Layout'),
        }),
    ], prefix),
]

const compKit = compCreator('kit/components')
export const docsKit = (prefix = '') => [
    createDoc('kit/overview', 'Kit Overview', undefined, prefix),
    createDoc('kit/components', 'Components', [
        compKit('DataGrid', {
            module: defineModule('control-ui', 'kit', 'control-kit', 'DataGrid'),
        }),
        compKit('ExpansionPanel', {
            module: defineModule('control-ui', 'kit', 'control-kit', 'ExpansionPanel'),
        }),
        compKit('HeadMeta', {
            module: defineModule('control-ui', 'kit', 'control-kit', 'HeadMeta'),
        }),
        compKit('Helper', {
            module: defineModule('control-ui', 'kit', 'control-kit', 'Helper'),
        }),
        compKit('Link', {
            module: defineModule('control-ui', 'kit', 'control-kit', 'Link'),
        }),
        compKit('List', {
            module: defineModule('control-ui', 'kit', 'control-kit', 'List'),
        }),
        compKit('Loading', {
            module: defineModule('control-ui', 'kit', 'control-kit', 'Loading'),
        }),
        compKit('NavList', {
            module: defineModule('control-ui', 'kit', 'control-kit', 'NavList'),
        }),
        compKit('PageContent', {
            module: defineModule('control-ui', 'kit', 'control-kit', 'PageContent'),
        }),
        compKit('RenderLink', {
            module: defineModule('control-ui', 'kit', 'control-kit', 'RenderLink'),
        }),
        compKit('ScrollUpButton', {
            module: defineModule('control-ui', 'kit', 'control-kit', 'ScrollUpButton'),
        }),
        compKit('Tooltip', {
            module: defineModule('control-ui', 'kit', 'control-kit', 'Tooltip'),
        }),
    ], prefix),
]

const compDocs = compCreator('docs/components')
export const docsDocs = (prefix = '') => [
    createDoc('docs/overview', 'Docs Overview', undefined, prefix),
    createDoc('docs/components', 'Components', [
        compDocs('ContentLoader', {
            module: defineModule('control-ui', 'docs', 'control-docs', 'ContentLoader'),
        }),
        compDocs('DocDetails', {
            module: defineModule('control-ui', 'docs', 'control-docs', 'DocDetails'),
        }),
        compDocs('DocsProvider', {
            module: defineModule('control-ui', 'docs', 'control-docs', 'DocsProvider'),
        }),
        compDocs('LinkableHeadline', {
            module: defineModule('control-ui', 'docs', 'control-docs', 'LinkableHeadline', ['LinkableHeadline.tsx', 'LinkableHeadlineMenu.tsx']),
        }),
        compDocs('Markdown', {
            module: defineModule('control-ui', 'docs', 'control-docs', 'Markdown', [
                'MarkdownRenderers.tsx',
                'MdBlockquote.tsx',
                'MdCode.tsx',
                'MdHeading.tsx',
                'MdInlineCode.tsx',
                'MdLink.tsx',
                'MdList.tsx',
                'MdTable.tsx',
            ]),
        }),
    ], prefix),
]

const compDocsTs = compCreator('docs-ts/components')
export const docsDocsTs = (prefix = '') => [
    createDoc('docs-ts/overview', 'Docs TS Overview', undefined, prefix),
    createDoc('docs-ts/components', 'Components', [
        compDocsTs('ModuleCode', {
            module: defineModule('control-ui', 'docs-ts', 'control-docs-ts', 'ModuleCode'),
        }),
        compDocsTs('ModuleIntro', {
            module: defineModule('control-ui', 'docs-ts', 'control-docs-ts', 'ModuleIntro'),
        }),
        compDocsTs('ModuleParams', {
            module: defineModule('control-ui', 'docs-ts', 'control-docs-ts', 'ModuleParams'),
        }),
        compDocsTs('TsDocModule', {
            module: defineModule('control-ui', 'docs-ts', 'control-docs-ts', 'TsDocModule', ['TsDocModule.ts']),
        }),
        compDocsTs('TsDocs', {
            module: defineModule('control-ui', 'docs-ts', 'control-docs-ts', 'TsDocs'),
        }),
        compDocsTs('TsDocsModule', {
            module: defineModule('control-ui', 'docs-ts', 'control-docs-ts', 'TsDocsModule'),
        }),
    ], prefix),
]

const compRoutes = compCreator('routes/components')
export const docsRoutes = (prefix = '') => [
    createDoc('routes/overview', 'Routes Overview', undefined, prefix),
    createDoc('routes/components', 'Components', [
        compRoutes('Route', {
            module: defineModule('control-ui', 'routes', 'control-routes', 'Route'),
        }),
        compRoutes('RouteCascade', {
            module: defineModule('control-ui', 'routes', 'control-routes', 'RouteCascade'),
        }),
        compRoutes('RouterProvider', {
            module: defineModule('control-ui', 'routes', 'control-routes', 'RouterProvider'),
        }),
        compRoutes('flattenRoutes', {
            module: defineModule('control-ui', 'routes', 'control-routes', 'flattenRoutes', ['flattenRoutes.ts']),
        }),
        compRoutes('filterRoutes', {
            module: defineModule('control-ui', 'routes', 'control-routes', 'filterRoutes', ['filterRoutes.ts']),
        }),
    ], prefix),
]

const compMdMui = compCreator('md/components')
export const docsMdMui = (prefix = '') => [
    createDoc('md/overview', 'Markdown MUI Overview', undefined, prefix),
    createDoc('md/components', 'Components', [
        compMdMui('MarkdownRenderers', {
            module: defineModule('control-ui', 'md', 'control-md', 'MarkdownRenderers'),
        }),
        compMdMui('MdBlockquote', {
            module: defineModule('control-ui', 'md', 'control-md', 'MdBlockquote'),
        }),
        compMdMui('MdCode', {
            module: defineModule('control-ui', 'md', 'control-md', 'MdCode'),
        }),
        compMdMui('MdHeading', {
            module: defineModule('control-ui', 'md', 'control-md', 'MdHeading'),
        }),
        compMdMui('MdInlineCode', {
            module: defineModule('control-ui', 'md', 'control-md', 'MdInlineCode'),
        }),
        compMdMui('MdLink', {
            module: defineModule('control-ui', 'md', 'control-md', 'MdLink'),
        }),
        compMdMui('MdList', {
            module: defineModule('control-ui', 'md', 'control-md', 'MdList'),
        }),
        compMdMui('MdTable', {
            module: defineModule('control-ui', 'md', 'control-md', 'MdTable'),
        }),
    ], prefix),
]
