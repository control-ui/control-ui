import { TsDocModuleCollectionSimple, TsDocsModuleRenderer } from '@control-ui/docs-ts/TsDocModule'
import { TsDocsSimple } from '@control-ui/docs-ts/TsDocsSimple'
import { LinkableHeadline } from '@control-ui/docs/LinkableHeadline'
import { MdInlineCode } from '@control-ui/md/MdInlineCode'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React, { ReactNode } from 'react'
import { Markdown } from '../component/Markdown'

const ModuleHeadline: React.ComponentType<React.PropsWithChildren<{
    id: string
    level: number
    secondary?: ReactNode
}>> = ({id, level, children, secondary}) => {
    return <LinkableHeadline level={level} levelOffsetVariant={2} customId={id} mb={0} mt={0} style={{wordBreak: 'break-all'}} secondary={secondary}>
        {children}
    </LinkableHeadline>
}

const renderer: TsDocsModuleRenderer = {
    InlineCode: MdInlineCode,
    Markdown: Markdown as React.ComponentType<{ source: string, dense?: boolean }>,
    ModuleHeadline: ModuleHeadline,
    Details: ({definition}) => {
        return <>
            {definition.type?.text ?
                <Box className={'docs-ts__module-type'}>
                    <Markdown
                        source={'```ts\n' + definition.type.text + '\n```'}
                    />
                </Box> : null}
        </>
    },
}

export const DocsDetailsModules: React.ComponentType<{ codeDocumentation: TsDocModuleCollectionSimple | undefined }> = ({codeDocumentation}) => {
    const repoRoot = 'https://github.com/control-ui/control-ui/tree/main/packages/'
    return <>
        <LinkableHeadline level={1} customId={'module-apis'} mb={4} mt={0}>
            Module APIs
        </LinkableHeadline>
        <Box mb={4}>
            <Alert severity={'info'} variant={'outlined'}>
                <AlertTitle>{'Simple Code Documentation'}</AlertTitle>
                <Typography gutterBottom variant={'body2'}>An overview of the exported variables and types. View details in their source files.</Typography>
                {/*<Typography gutterBottom variant={'body2'}>Experimental documentation generator, there may be missing or bad-UX parts in the generated code documentation.</Typography>*/}
                {/*<Typography variant={'body2'}>Additionally, not all source code is converted to full-Typescript yet, for the pure-JS parts nothing can be generated.</Typography>*/}
            </Alert>
        </Box>

        {codeDocumentation ?
            <TsDocsSimple
                documentation={codeDocumentation}
                repoRoot={repoRoot}
                renderer={renderer}
                // showFiles={false}
            /> : null}
    </>
}
