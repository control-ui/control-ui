export interface DocsIndexModule {
    module: string
    package: string
    fromPath: string
    pagePath: string
}

export type DocsIndexValueModules<M = DocsIndexModule> = {
    modules: M[]
}

export type DocsIndexValuePackages = {
    packages: {
        [p: string]: {
            [f: string]: number
        }
    }
}

export interface DocsIndexValuePageInfo {
    pagePath: string
    label?: string
    parentLabel?: string[]
}

export type DocsIndexValuePages<P extends DocsIndexValuePageInfo = DocsIndexValuePageInfo> = {
    pages: P[]
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DocsIndexValues {
    [k: string]: any
}

export type DocsIndexValuesCombiner<C extends {} = {}> = DocsIndexValues & C

export type DocsIndexState<I extends DocsIndexValues = DocsIndexValues> = {
    update: <K extends keyof I>(key: K, updater: (oldIndex: I[K]) => I[K]) => void
    index: I
}

export const createDocsIndex = <I extends DocsIndexValues = DocsIndexValues>(initialIndex: I): DocsIndexState<I> => {
    const index = {...initialIndex}

    const update = <K extends keyof I = keyof I>(key: K, updater: (oldIndex: I[K]) => I[K]) => {
        index[key] = updater(index[key])
    }

    return {
        update,
        index,
    }
}
