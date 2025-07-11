import React from 'react'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { TsDocModule, TsDocsModuleRenderer } from '@control-ui/docs-ts/TsDocModule'

export interface ModuleIntroProps {
    modules: TsDocModule
    repoRoot: string
    registryRoot: string
    renderer: TsDocsModuleRenderer
    showFiles?: boolean
}

export const ModuleIntro: React.ComponentType<ModuleIntroProps> = (
    {
        modules,
        repoRoot,
        registryRoot,
        renderer,
        showFiles,
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
            <InlineCode>@import * from {packageName}{fromPath ? '/' : ''}{fromPath}</InlineCode>
        </Typography>

        {showFiles ?
            <Typography variant={'body2'} gutterBottom component={'div'}>
                <Typography variant={'subtitle2'}>Files:</Typography>

                <ul style={{marginTop: 3, marginBottom: 0}}>
                    {files.map((f, i) =>
                        <li key={i} style={{marginBottom: i < (files.length || 0) - 1 ? 3 : 0}}>
                            <Link
                                href={repoRoot + modules.modulePath + f}
                                target={'_blank'} rel={'noreferrer'}
                            >
                                {f}
                            </Link>
                        </li>,
                    )}
                </ul>
            </Typography> : null}
    </>
}
