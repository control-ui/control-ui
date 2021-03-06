import { PropType } from '@structured-types/api'
import { TsDocModuleFileParsed, TsDocModuleFileSource } from '@control-ui/docs-ts/TsDocModule'
import * as path from 'path'
import * as fs from 'fs'
import { DocsIndexModule, DocsIndexState, DocsIndexValueModules, DocsIndexValuePackages, DocsIndexValuesCombiner } from '@control-ui/docs/createDocsIndex'

export const extractTsModule = (moduleId: string, file: TsDocModuleFileSource): DocsIndexModule => ({
    module: moduleId,
    package: file.package,
    fromPath: file.fromPath,
    pagePath: file.pagePath,
})

export function indexTsDocs<M extends DocsIndexModule = DocsIndexModule>(
    baseModules: string,
    fileInfo: { [k: string]: PropType },
    files: TsDocModuleFileSource[],
    update: DocsIndexState<DocsIndexValuesCombiner<DocsIndexValueModules<M> & DocsIndexValuePackages>>['update'],
    extractModule: (moduleId: string, file: TsDocModuleFileSource) => M,
): TsDocModuleFileParsed[] {
    return Object.values(Object.keys(fileInfo).reduce((parsed, moduleId) => {
        const {loc} = fileInfo[moduleId]
        if(!loc) return parsed
        const {filePath} = loc
        if(!filePath) return parsed
        const relFilePath = filePath.slice(baseModules.length + 1)
        const file: TsDocModuleFileSource | undefined = files.find(f => relFilePath.startsWith(f.modulePath))
        if(!file) return parsed

        update('packages', packages => ({
            ...packages,
            [file.package]: {
                ...(packages[file.package] || {}),
                [file.fromPath]: (packages[file.package]?.[file.fromPath] || 0) + 1,
            },
        }))

        update('modules', modulesIndex => ([
            ...modulesIndex,
            extractModule(moduleId, file),
        ]))

        return {
            ...parsed,
            [file.modulePath]: {
                ...file,
                ...(parsed[file.modulePath] || {}),
                docs: {
                    ...(parsed[file.modulePath]?.docs || {}),
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
    }, {} as { [modulePath: string]: TsDocModuleFileParsed }))
}

/**
 *
 * @param dist
 * @param parsed
 * @param debug turn on logging, `2` = debug, `1` = only errors
 */
export function writeTsDocs(
    dist: string,
    parsed: TsDocModuleFileParsed[],
    debug?: 1 | 2,
) {
    return Promise.all(
        parsed.map(docInfo => {
            const fullPath = path.join(dist, docInfo.package, docInfo.fromPath + '.json')
            return new Promise<void>((resolve, reject) => {
                const fullDir = path.dirname(fullPath)
                fs.stat(fullDir, stats => {
                    if(stats) {
                        fs.mkdirSync(fullDir, {
                            recursive: true,
                        })
                    }

                    fs.writeFile(fullPath, JSON.stringify(docInfo), err => {
                        if(err) {
                            if(debug) {
                                console.error('Failed saving doc of ' + docInfo.package + '/' + docInfo.fromPath, err)
                            }

                            reject(err)
                            return
                        }

                        if(debug === 2) {
                            console.log('Saved ' + docInfo.package + '/' + docInfo.fromPath)
                        }

                        resolve()
                    })
                })
            })
        }),
    )
}
