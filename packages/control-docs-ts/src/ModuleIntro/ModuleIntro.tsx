import React from 'react'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { TsDocModuleCollection } from '@control-ui/docs-ts/TsDocModule'
import { TsDocsModuleRenderer } from '@control-ui/docs-ts/TsDocs'

export interface ModuleIntroProps {
    modules: TsDocModuleCollection
    repoRoot: string
    registryRoot: string
    renderer: TsDocsModuleRenderer
}

export const ModuleIntro: React.ComponentType<ModuleIntroProps> = (
    {
        modules,
        repoRoot,
        registryRoot,
        renderer,
    },
) => {
    const {InlineCode} = renderer
    const {package: packageName, fromPath, files} = modules
    return <>
        <Typography variant={'body2'} gutterBottom>
            {'Package: '}
            <Link
                href={registryRoot + packageName}
                target={'_blank'} rel={'noreferrer'}
            >
                {packageName}
            </Link>
        </Typography>

        <Typography variant={'body2'} gutterBottom>
            <InlineCode>@import * from {packageName}/{fromPath}</InlineCode>
        </Typography>

        <Typography variant={'body2'} gutterBottom component={'div'}>
            <Typography variant={'subtitle2'}>Files:</Typography>

            <ul style={{marginTop: 3, marginBottom: 0}}>
                {files.map((f, i) =>
                    <li key={i} style={{marginBottom: i < (files.length || 0) - 1 ? 3 : 0}}>
                        <Link
                            href={repoRoot + modules.relPath + f}
                            target={'_blank'} rel={'noreferrer'}
                        >
                            {f}
                        </Link>
                    </li>,
                )}
            </ul>
        </Typography>
    </>
}
