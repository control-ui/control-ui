import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IcWarn from '@mui/icons-material/Warning'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import { InterfaceProp, isClassProp, isInterfaceProp, isTupleProp, isTypeProp, isUnionProp, PropKind, PropType } from '@structured-types/api'
import { TsDocModuleDefinition } from '@control-ui/docs-ts/TsDocModule'
import { TsDocsModuleRenderer } from '@control-ui/docs-ts/TsDocs'
import { ModuleCodeGenerics, ModuleCodeReturns } from '@control-ui/docs-ts/ModuleCode'
import { ModuleParams } from '@control-ui/docs-ts/ModuleParams'

export interface TsDocsModuleProps {
    id: string
    repoRoot: string
    module: TsDocModuleDefinition
    renderer: TsDocsModuleRenderer
    headlineIdPrefix?: string
    hideMainKind?: boolean
    warnOnTag?: string[]
}

export const TsDocsModule: React.ComponentType<TsDocsModuleProps> = (
    {
        module,
        repoRoot,
        id,
        renderer,
        headlineIdPrefix = 'doc-module--',
        hideMainKind,
        warnOnTag,
    },
) => {
    const {
        ModuleHeadline, InlineCode,
        Markdown,
    } = renderer
    const {
        type,
        generics, types, see,
        loc,
        deprecated, tags,
        properties, parameters,
        returns,
    } = module
    const tagsWithDesc = tags?.filter(t => typeof t.content === 'string')
    const tagsWithWarn = warnOnTag ? tags?.filter(t => warnOnTag.indexOf(t.tag) !== -1) : undefined
    return <Box mb={2}>
        <Paper variant={'outlined'} style={{borderRadius: 5}}>
            <Box my={1} px={1}>
                <ModuleHeadline level={2} id={headlineIdPrefix + id}>
                    {id}
                    {!hideMainKind && module.kind ? ' (' + PropKind[module.kind] + ')' : null}
                </ModuleHeadline>

                {loc?.loc && typeof loc.loc?.start.line === 'number' ?
                    <Link
                        href={repoRoot + loc.filePath + '#L' + loc.loc?.start.line}
                        target={'_blank'} rel={'noreferrer'}
                    ><small>src</small></Link> : null}
            </Box>

            <Box px={1} style={{overflow: 'auto'}}>
                {generics || types || type ?
                    <Typography gutterBottom>
                        <InlineCode>
                            {type ? <span>{type}</span> : null}
                            {generics || types ?
                                <ModuleCodeGenerics generics={(generics || types) as PropType[]}/> : null}
                        </InlineCode>
                    </Typography> : null}

                {deprecated || tagsWithWarn?.length ?
                    <Box mb={1}>
                        {deprecated ? <Chip label={'deprecated'} color={'warning'} size={'small'} icon={<IcWarn/>}/> : null}
                        {tagsWithWarn?.map(
                            (tag, i) =>
                                <Chip
                                    key={i}
                                    label={tag.tag}
                                    color={'warning'} size={'small'}
                                    icon={<IcWarn/>}
                                />,
                        )}
                    </Box> : null}

                {(isClassProp(module) || isInterfaceProp(module) || isTypeProp(module)) && (module as InterfaceProp).extends ? <Box mb={1}>
                    <Typography>extends <InlineCode>{(module as InterfaceProp)?.extends?.map(ex => ex.name).join(', ')}</InlineCode></Typography>
                </Box> : null}

                {module.alias ? <Box mb={1}>
                    <Typography>Alias of: <InlineCode>{module.alias}</InlineCode></Typography>
                </Box> : null}

                {module.description ? <Box mb={1}>
                    <Markdown source={module.description}/>
                </Box> : null}

                {typeof deprecated === 'string' ? <Box mb={2}>
                    <Typography variant={'subtitle1'} gutterBottom>Deprecated</Typography>
                    <Markdown source={deprecated}/>
                </Box> : null}

                {(tagsWithDesc?.length || 0) > 0 ? <Box mb={2}>
                    <Typography variant={'subtitle1'} gutterBottom>Tags</Typography>
                    {tagsWithDesc?.map((s, i) =>
                        <Box key={i} mb={1} ml={2}>
                            <Typography variant={'subtitle2'} gutterBottom>{s.tag}</Typography>
                            <Markdown source={s.content as string} dense/>
                        </Box>,
                    )}
                </Box> : null}

                {(see?.length || 0) > 0 ? <Box mb={2}>
                    <Typography variant={'subtitle1'}>See</Typography>
                    <ul style={{margin: 0}}>
                        {see?.map((s, i) =>
                            <Box key={i} component={'li'} mb={1}><Markdown source={s}/></Box>,
                        )}
                    </ul>
                </Box> : null}
            </Box>

            {properties ? <>
                <Box mt={2} px={1}>
                    <Typography variant={'subtitle1'}>{isTupleProp(module) || isUnionProp(module) ? 'Values' : 'Props'}</Typography>
                </Box>
                <ModuleParams
                    parent={module}
                    params={properties}
                    renderer={renderer}
                />
            </> : null}

            {parameters ? <>
                <Box mt={2} px={1}>
                    <Typography variant={'subtitle1'}>Parameters</Typography>
                </Box>
                <ModuleParams
                    parent={module}
                    params={parameters}
                    renderer={renderer}
                />
            </> : null}

            {returns ? <Box mt={2} mb={2} px={1} style={{overflow: 'auto'}}>
                <Typography variant={'subtitle1'}>Returns</Typography>
                <ModuleCodeReturns returns={returns} parent={module} renderer={renderer}/>
            </Box> : null}
        </Paper>
    </Box>
}
