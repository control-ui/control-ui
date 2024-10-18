import React from 'react'

// todo: refactor to TS compiler API helpers
type PropType = any
// todo: refactor to TS compiler API helpers
type SourceLocation = any

export interface TsDocModule {
    // pagePath: string
    modulePath: string
    /**
     * @deprecated duplicated with `modulePath`
     */
    relPath: string
    package: string
    fromPath: string
    files: string[]
}

export interface TsDocModuleCollection extends TsDocModule {
    docs: { [k: string]: TsDocModuleDefinition }
}


export interface TsDocModuleCollectionSimple extends TsDocModule {
    definitions: any[]
}

/**
 * @see [structured-types PropType](https://github.com/ccontrols/structured-types/blob/master/packages/api/README.md#proptype)
 * @todo refactor to TS compiler API helpers
 */
export interface TsDocModuleDefinition extends PropType {
    name: string
    description?: string
    extension?: 'react'
    // todo: where are custom TSDoc comments available? e.g. `internal`/`@internal` doesn't do anything
    internal?: boolean
    // kind: number
    // deprecated?: boolean
    generics?: PropType[]
    types?: PropType[]
    properties?: PropType[]
    parameters?: PropType[]
    returns?: PropType
}

export interface TsDocModuleFileSource extends TsDocModule {
    pagePath: string
}

export interface PropTypeWithLoc extends PropType {
    loc: SourceLocation
}

export interface TsDocModuleFileParsed extends TsDocModuleFileSource {
    docs: {
        [moduleId: string]: PropTypeWithLoc
    }
}

export type TsDocsModuleRenderer = {
    InlineCode: React.ComponentType<React.PropsWithChildren<{}>>
    ModuleHeadline: React.ComponentType<React.PropsWithChildren<{
        id: string
        level: number
    }>>
    Markdown: React.ComponentType<{
        source: string
        dense?: boolean
    }>
}
