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
        const file: TsDocModuleFileSource | undefined = files.find(f => relFilePath.startsWith(f.relPath))
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
    }, {} as { [relPath: string]: TsDocModuleFileParsed }))
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
            const dir = path.join(dist, docInfo.package)
            return new Promise<void>((resolve, reject) => {
                fs.stat(dir, (stats) => {
                    if(stats) {
                        fs.mkdirSync(dir, {recursive: true})
                    }

                    fs.writeFile(path.join(dir, docInfo.fromPath + '.json'), JSON.stringify(docInfo), (err) => {
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
