import * as fs from 'fs'
import * as path from 'path'
import { parseFiles } from '@structured-types/api'
import * as reactPlugin from '@structured-types/react-plugin'

export interface DocFileReactSource {
    relPath: string
    package: string
    fromPath: string
    files: string[]
}

export interface DocFileReactParsed extends DocFileReactSource {
    docs: any
}

const makeFile = (org: string, name: string, dir: string, from: string, customFiles?: string[]): DocFileReactSource => ({
    //relPath: `../${dir}/src/${from}/${from}.tsx`,
    relPath: `${dir}/src/${from}/`,
    package: `@${org}/${name}`,
    fromPath: from,
    files: customFiles ? customFiles : [from + '.tsx'],
})

const files: DocFileReactSource[] = [
    {
        relPath: 'control-app/src/App/',
        package: '@control-ui/app',
        fromPath: 'App',
        files: ['App.tsx'],
    },
    {
        relPath: 'control-app/src/AppLoader/',
        package: '@control-ui/app',
        fromPath: 'AppLoader',
        files: ['AppLoader.tsx'],
    },
    {
        relPath: 'control-app/src/AppTheme/',
        package: '@control-ui/app',
        fromPath: 'AppTheme',
        files: ['AppTheme.tsx'],
    },
    {
        relPath: 'control-app/src/AppThemeDynamic/',
        package: '@control-ui/app',
        fromPath: 'AppThemeDynamic',
        files: ['AppThemeDynamic.tsx'],
    },
    makeFile('control-ui', 'app', 'control-app', 'Drawer'),
    makeFile('control-ui', 'app', 'control-app', 'DrawerProvider'),
    makeFile('control-ui', 'app', 'control-app', 'Footer'),
    makeFile('control-ui', 'app', 'control-app', 'Header'),
    makeFile('control-ui', 'app', 'control-app', 'I18nProvider'),
    makeFile('control-ui', 'app', 'control-app', 'Layout'),
    makeFile('control-ui', 'app', 'control-app', 'RouteCascade'),
    makeFile('control-ui', 'app', 'control-app', 'RouterProvider'),
    //
    makeFile('control-ui', 'docs', 'control-docs', 'ContentLoader'),
    makeFile('control-ui', 'docs', 'control-docs', 'DocDetails'),
    makeFile('control-ui', 'docs', 'control-docs', 'DocsProvider'),
    makeFile('control-ui', 'docs', 'control-docs', 'LinkableHeadline', ['LinkableHeadline.tsx', 'LinkableHeadlineMenu.tsx']),
    makeFile('control-ui', 'docs', 'control-docs', 'Markdown'),
    //
    makeFile('control-ui', 'kit', 'control-kit', 'DataGrid'),
    makeFile('control-ui', 'kit', 'control-kit', 'ExpansionPanel'),
    makeFile('control-ui', 'kit', 'control-kit', 'HeadMeta'),
    makeFile('control-ui', 'kit', 'control-kit', 'Helper'),
    makeFile('control-ui', 'kit', 'control-kit', 'Link'),
    makeFile('control-ui', 'kit', 'control-kit', 'List'),
    makeFile('control-ui', 'kit', 'control-kit', 'Loading'),
    makeFile('control-ui', 'kit', 'control-kit', 'Menu'),
    makeFile('control-ui', 'kit', 'control-kit', 'PageContent'),
    makeFile('control-ui', 'kit', 'control-kit', 'Process'),
    makeFile('control-ui', 'kit', 'control-kit', 'Route'),
    makeFile('control-ui', 'kit', 'control-kit', 'ScrollUpButton'),
    makeFile('control-ui', 'kit', 'control-kit', 'Settings'),
    makeFile('control-ui', 'kit', 'control-kit', 'Tooltip'),
]

const makeIndexStore = () => {
    const index: any = {
        modules: [],
        packages: {},
        // exports: {},
    }

    const updateModules = (updateModules: (oldIndex: any) => any) => {
        index.modules = updateModules(index.modules)
    }
    const updatePackages = (updateModules: (oldIndex: any) => any) => {
        index.packages = updateModules(index.packages)
    }
    const updateExports = (updateModules: (oldIndex: any) => any) => {
        index.exports = updateModules(index.exports)
    }
    return {
        updateModules,
        updatePackages,
        updateExports,
        index,
    }
}

// @ts-ignore
const {index: docsIndex, updateModules, updatePackages} = makeIndexStore()

const base = path.resolve(path.join('public', 'docs-component'))
const baseModules = path.resolve('../')

const fileTree: string[] = files.reduce((fileTree, file) => {
    return [...fileTree, ...file.files.map(f => path.join(baseModules, file.relPath, f))]
}, [] as string[])

const fileInfo = parseFiles(fileTree, {
    // @ts-ignore
    plugins: [reactPlugin],
    /* -
     * `2` does not contain function parameter types inside of interfaces
     * `2` resolves interface props shallow enough to read named ones easily, e.g. at `LayoutProps`
     * `3` resolves interface props too deep, making `ComponentClass<P> | FunctionComponent<P>` instead of `React.ComponentType<RouteComponentProps>` (in `LayoutProps`)
     * `3` resolves function params deep enough like in `DrawerProviderContext`, it creates: `(open: Boolean | setOpenHandler) => Void` - where `2` only makes: `(open) => Void`
     */
    maxDepth: 3,
    collectSourceInfo: true,
    collectHelpers: false,
    //collectInheritance: false,
    //collectInternals: true,
})

// @ts-ignore
const parsed: DocFileReactParsed[] = Object.values(Object.keys(fileInfo).reduce((parsed, moduleId) => {
    const {loc} = fileInfo[moduleId]
    if(!loc) return parsed
    const {filePath} = loc
    if(!filePath) return parsed
    const relFilePath = filePath.slice(baseModules.length + 1)
    const file = files.find(f => relFilePath.startsWith(f.relPath))
    if(!file) return parsed

    updatePackages(packages => ({
        ...packages,
        [file.package]: {
            ...(packages[file.package] || {}),
            [file.fromPath]: (packages[file.package]?.[file.fromPath] || 0) + 1,
        },
    }))

    updateModules(modulesIndex => ([
        ...modulesIndex,
        {
            module: moduleId,
            package: file.package,
            fromPath: file.fromPath,
        },
    ]))

    return {
        ...parsed,
        [file.relPath]: {
            ...file,
            ...(parsed[file.relPath] || {}),
            docs: {
                ...(parsed[file.relPath]?.docs || {}),
                [moduleId]: {
                    ...fileInfo[moduleId],
                    loc: {
                        ...loc,
                        filePath: relFilePath,
                    },
                },
            },
        },
    }
}, {} as any))

parsed.forEach(docInfo => {
    // console.log(docInfo.package + '/' + docInfo.fromPath, docInfo.docs)
    const dir = path.join(base, docInfo.package)
    fs.stat(dir, (stats) => {
        if(stats) {
            fs.mkdirSync(dir, {recursive: true})
        }

        fs.writeFile(path.join(dir, docInfo.fromPath + '.json'), JSON.stringify(docInfo, undefined, 4), (err) => {
            if(err) {
                console.error('Failed saving doc of ' + docInfo.package + '/' + docInfo.fromPath, err)
                return
            }

            console.log('Saved ' + docInfo.package + '/' + docInfo.fromPath)
        })

    })
})

fs.writeFile(path.join(base, 'index.json'), JSON.stringify(docsIndex), (err) => {
    if(err) {
        console.error('Failed saving doc of docsIndex', err)
        return
    }

    console.log('Saved docsIndex')
})
