import React from 'react'

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

/**
 * Page location with its containing module lookup definition.
 */
export interface TsDocModuleFileSource extends TsDocModule {
    pagePath: string
}

/**
 * Generated output for an isolated module.
 */
export interface TsDocModuleCollectionSimple extends TsDocModule {
    definitions: TsDocModuleDefinition[]
}

export interface TsDocModuleDefinitionSymbol {
    name: string
    description?: string
    type?: {
        text: string
    }
}

export interface TsDocModuleDefinitionSymbolInfo extends TsDocModuleDefinitionSymbol {
    deprecated?: true
    internal?: true
    comment?: TsDocTagContent[]
    tags?: {
        author?: TsDocTagContent[][]
        see?: TsDocTagContent[][]
        internal?: TsDocTagContent[][]
        deprecated?: TsDocTagContent[][]
        remarks?: TsDocTagContent[][]
        example?: TsDocTagContent[][]
    }
}

export interface TsDocModuleDefinition extends TsDocModuleDefinitionSymbolInfo {
    exported?: boolean
    referenced?: boolean
    loc: TsDocLoc
    kind:
        'TypeAliasDeclaration' |
        'InterfaceDeclaration' |
        'ClassDeclaration' |
        'FunctionDeclaration' |
        'VariableDeclaration' |
        string
}

export type TsDocTagContent =
    TsDocTagContentText
    | TsDocTagContentLink

export interface TsDocTagContentText {
    kind: 'JSDocText'
    text: string
}

export interface TsDocTagContentLink {
    kind: 'JSDocLink'
    text: string
}

export interface TsDocLoc {
    filePath: string
    start: {
        line: number
        character: number
    }
    end: {
        line: number
        character: number
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
