import React from 'react'
import Box from '@mui/material/Box'
import { TsDocModuleCollection } from '@control-ui/docs-ts/TsDocModule'
import { TsDocsModule, TsDocsModuleProps } from '@control-ui/docs-ts/TsDocsModule'
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

export interface DocsTsModulesProps extends Omit<TsDocsModuleProps, 'id' | 'module'> {
    modules: TsDocModuleCollection
    repoRoot: string
    registryRoot?: string
    renderer: TsDocsModuleRenderer
}

export const TsDocs: React.ComponentType<DocsTsModulesProps> = (
    {
        modules,
        repoRoot,
        registryRoot = 'https://www.npmjs.com/package/',
        renderer,
        ...p
    },
) => {
    return <>
        <Box mb={4}>
            <ModuleIntro
                modules={modules}
                registryRoot={registryRoot}
                repoRoot={repoRoot}
                renderer={renderer}
            />
        </Box>

        {Object.keys(modules.docs).map(module =>
            <TsDocsModule
                key={module}
                id={module}
                repoRoot={repoRoot}
                module={modules.docs[module]}
                renderer={renderer}
                {...p}
            />,
        )}
    </>
}
