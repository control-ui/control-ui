import { TsDocsSimpleModule, TsDocsSimpleModuleProps } from '@control-ui/docs-ts/TsDocsSimpleModule'
import React from 'react'
import Box from '@mui/material/Box'
import { TsDocModuleCollectionSimple } from '@control-ui/docs-ts/TsDocModule'
import { ModuleIntro } from '@control-ui/docs-ts/ModuleIntro'

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

export interface DocsTsModulesProps extends Omit<TsDocsSimpleModuleProps, 'id' | 'definition'> {
    documentation: TsDocModuleCollectionSimple
    repoRoot: string
    registryRoot?: string
    showFiles?: boolean
    renderer: TsDocsModuleRenderer
}

export const TsDocsSimple: React.ComponentType<DocsTsModulesProps> = (
    {
        documentation,
        repoRoot,
        registryRoot = 'https://www.npmjs.com/package/',
        renderer,
        showFiles,
        ...p
    },
) => {
    return <>
        <Box mb={4}>
            <ModuleIntro
                modules={documentation}
                registryRoot={registryRoot}
                repoRoot={repoRoot}
                renderer={renderer}
                showFiles={showFiles}
            />
        </Box>

        {documentation.definitions.map((d, i) =>
            <TsDocsSimpleModule
                key={i}
                definition={d}
                renderer={renderer}
                repoRoot={repoRoot}
                // todo: with the new TS crawler, it may have multiple definitions for the same name,
                //       but index and search don't support this yet
                id={d.name}
                // id={d.name + '.' + i}
                {...p}
            />)}
    </>
}
