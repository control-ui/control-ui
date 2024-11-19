import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IcWarn from '@mui/icons-material/Warning'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import { TsDocModuleDefinition, TsDocsModuleRenderer, TsDocTagContent } from '@control-ui/docs-ts/TsDocModule'

const kindNames: { [K in TsDocModuleDefinition['kind']]: string } = {
    TypeAliasDeclaration: 'type',
    InterfaceDeclaration: 'interface',
    FunctionDeclaration: 'function',
    ClassDeclaration: 'class',
    VariableDeclaration: 'variable',
}

export interface TsDocsSimpleModuleProps {
    id: string
    repoRoot: string
    basePath: string
    definition: TsDocModuleDefinition
    renderer: TsDocsModuleRenderer
    headlineIdPrefix?: string
    hideMainKind?: boolean
}

export const TsDocsSimpleModule: React.ComponentType<TsDocsSimpleModuleProps> = (
    {
        definition,
        repoRoot,
        basePath,
        id,
        renderer,
        headlineIdPrefix = 'doc-module--',
        hideMainKind,
    },
) => {
    const {
        ModuleHeadline,
        Markdown,
    } = renderer
    const filePath = definition.loc.filePath.slice(basePath.length)
    return <Box mb={2}>
        <Paper variant={'outlined'} style={{borderRadius: 5}}>
            <Box my={1} px={1}>
                <ModuleHeadline level={2} id={headlineIdPrefix + id}>
                    {definition.name || <em>{'No Name'}</em>}
                </ModuleHeadline>

                <Typography
                    variant={'body2'} color={'textSecondary'}
                    sx={{display: 'flex', flexWrap: 'wrap', columnGap: 0.5}}
                >
                    {!hideMainKind && definition.kind ? <small>{definition.kind in kindNames ? kindNames[definition.kind] : definition.kind}</small> : null}

                    {definition.loc && typeof definition.loc?.start.line === 'number' ?
                        <Box component={'small'} ml={'auto'}><Link
                            href={repoRoot + definition.loc.filePath + '#L' + (definition.loc?.start.line + 1) + ':L' + (definition.loc?.end.line + 1)}
                            target={'_blank'} rel={'noreferrer'}
                        >{filePath} L{definition.loc?.start.line + 1}</Link></Box> : null}
                </Typography>
            </Box>

            <Box px={1} style={{overflow: 'auto'}}>
                {definition.deprecated ?
                    <Box mb={1} sx={{display: 'flex', flexWrap: 'wrap'}}>
                        <Chip label={'deprecated'} color={'warning'} size={'small'} icon={<IcWarn/>}/>
                        {definition.tags?.deprecated?.length ?
                            <PrintTag
                                tag={definition.tags?.deprecated}
                                Markdown={Markdown}
                            /> : null}
                    </Box> : null}

                {definition.internal ?
                    <Box mb={1} sx={{display: 'flex', flexWrap: 'wrap'}}>
                        <Chip label={'internal'} color={'warning'} size={'small'} icon={<IcWarn/>}/>
                        {definition.tags?.internal?.length ?
                            <PrintTag
                                tag={definition.tags?.internal}
                                Markdown={Markdown}
                            /> : null}
                    </Box> : null}

                {definition.type?.text ?
                    <Box className={'docs-ts__module-type'}>
                        <Markdown
                            source={'```ts\n' + definition.type.text + '\n```'}
                        />
                    </Box> : null}

                {definition.description ? <Box mt={1} mb={2}>
                    <Markdown source={definition.description}/>
                </Box> : null}

                {definition.tags?.example ?
                    <Box>
                        <Typography variant={'subtitle2'} gutterBottom>{'Example'}</Typography>
                        <PrintTag
                            tag={definition.tags?.example}
                            Markdown={Markdown}
                            parseEmail
                        />
                    </Box> : null}

                {definition.tags?.author ?
                    <Box>
                        <Typography variant={'subtitle2'} gutterBottom>{'Author'}</Typography>
                        <PrintTag
                            tag={definition.tags?.author}
                            Markdown={null}
                            parseEmail
                        />
                    </Box> : null}

                {definition.tags?.remarks ?
                    <Box>
                        <Typography variant={'subtitle2'} gutterBottom>{'Remarks'}</Typography>
                        <PrintTag
                            tag={definition.tags?.remarks}
                            Markdown={Markdown}
                            parseEmail
                        />
                    </Box> : null}

                {definition.tags?.see ?
                    <Box>
                        <Typography variant={'subtitle2'} gutterBottom>{'See'}</Typography>
                        <PrintTag
                            tag={definition.tags?.see}
                            Markdown={Markdown}
                        />
                    </Box> : null}
            </Box>
        </Paper>
    </Box>
}

const PrintTag = ({tag, parseEmail, Markdown}: { tag: TsDocTagContent[][], parseEmail?: boolean, Markdown: null | TsDocsModuleRenderer['Markdown'] }) => {
    // todo: each tag contains one entry, which should be converted to a combined MD format
    return <Box ml={1.5}>
        {tag.map((t, i) =>
            <Box key={i} mb={1}>
                {t.map((content, j) =>
                    <PrintTagContent
                        key={j}
                        content={content}
                        parseEmail={parseEmail}
                        Markdown={Markdown}
                    />,
                )}
            </Box>,
        )}
    </Box>
}

const PrintTagContent = ({content, parseEmail, Markdown}: { content: TsDocTagContent, parseEmail?: boolean, Markdown: null | TsDocsModuleRenderer['Markdown'] }) => {
    if(content.kind === 'JSDocLink') {
        const [link, title] = content.text.split('|')
        // todo: refine linking to symbol references
        const fullLink = link.includes('://') ? link : '#' + link
        return <Box component={'span'}>
            <Link href={fullLink}>{title?.trim() || link.trim()}</Link>
        </Box>
    }

    if(content.kind === 'JSDocText' && parseEmail) {
        const emailStart = content.text.indexOf('<')
        if(emailStart !== -1) {
            const emailEnd = content.text.indexOf('>', emailStart)
            if(emailEnd !== -1) {
                const email = (content.text as string).slice(emailStart + 1, emailEnd)
                return <Box component={'span'}>
                    {email
                        ? <Link href={'mailto:' + email}>{content.text}</Link>
                        : content.text}
                </Box>
            }
        }
    }

    // JSDocText
    return <Box
        component={'span'}
        sx={{'& > :last-child': {mb: 0}}}
    >
        {Markdown ?
            <Markdown
                source={content.text}
            /> :
            content.text}
    </Box>
}
