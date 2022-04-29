import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IcWarn from '@mui/icons-material/Warning'
import { Chip, Link, Tooltip } from '@mui/material'
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
}

export const TsDocsModule: React.ComponentType<TsDocsModuleProps> = (
    {
        module,
        repoRoot,
        id,
        renderer,
        headlineIdPrefix = 'doc-module--',
        hideMainKind,
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
        deprecated, internal,
        properties, parameters,
        returns,
    } = module
    return <Box mb={2}>
        <Paper variant={'outlined'} style={{borderRadius: 5}}>
            <Box px={1} py={2}>
                <Box mb={2}>
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

                {generics || types || type ?
                    <Typography gutterBottom>
                        <InlineCode>
                            {type ? <span>{type}</span> : null}
                            {generics || types ?
                                <ModuleCodeGenerics generics={(generics || types) as PropType[]}/> : null}
                        </InlineCode>
                    </Typography> : null}

                {deprecated || internal ?
                    <Box mb={1}>
                        {deprecated ?
                            <Tooltip title={typeof deprecated === 'string' ? deprecated : 'no alternative given'}>
                                <Chip label={'deprecated'} color={'warning'} size={'small'} icon={<IcWarn/>}/>
                            </Tooltip> : null}
                        {internal ? <Chip label={'internal'} color={'warning'} size={'small'} icon={<IcWarn/>}/> : null}
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

                {(see?.length || 0) > 0 ? <Box mb={2}>
                    <Typography variant={'subtitle1'}>See</Typography>
                    <ul style={{margin: 0}}>
                        {see?.map((s, i) =>
                            <Box key={i} component={'li'} mb={1}><Markdown source={s}/></Box>,
                        )}
                    </ul>
                </Box> : null}

                {properties ?
                    <ModuleParams
                        parent={module}
                        params={properties}
                        title={isTupleProp(module) || isUnionProp(module) ? 'Values' : 'Props'}
                        renderer={renderer}
                    /> : null}

                {parameters ?
                    <ModuleParams
                        parent={module}
                        params={parameters}
                        title={'Parameters'}
                        renderer={renderer}
                    /> : null}

                {returns ? <Box mb={2}>
                    <Typography variant={'subtitle1'}>Returns</Typography>
                    <ModuleCodeReturns returns={returns} parent={module} renderer={renderer}/>
                </Box> : null}
            </Box>
        </Paper>
    </Box>
}
