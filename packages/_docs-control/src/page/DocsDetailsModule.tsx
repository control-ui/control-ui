import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IcWarn from '@mui/icons-material/Warning'
import { Markdown } from '../component/Markdown'
import { MdInlineCode } from '@control-ui/docs/Markdown'
import { LinkableHeadline } from '@control-ui/docs/LinkableHeadline'
import { DocModuleExport } from './DocGenModule'
import { DocGenRendererNameOrTypedValue, DocGenRendererGenerics } from './DocGenRenderer'
import { DocGenParamsTable } from './DocGenParamsTable'
import { Chip, Link, Tooltip } from '@mui/material'
import { InterfaceProp, isClassProp, isInterfaceProp, isTupleProp, isTypeProp, isUnionProp, PropKind, PropType } from '@structured-types/api'

export const DocsDetailsModule: React.ComponentType<{
    module: DocModuleExport
    id: string
    repoRoot: string
}> = ({module, repoRoot, id}) => {
    const {generics, types} = module
    return <Box mb={2}>
        <Paper variant={'outlined'} style={{borderRadius: 5}}>
            <Box px={1} py={2}>
                <Box mb={2}>
                    <LinkableHeadline level={2} levelOffsetVariant={2} customId={'doc-module--' + id} mt={0} mb={0}>
                        {id}
                        {module.kind ? ' (' + PropKind[module.kind] + ')' : null}
                    </LinkableHeadline>

                    {module.loc?.loc ?
                        <Link
                            href={repoRoot + module.loc.filePath + '#L' + module.loc?.loc?.start.line}
                            target={'_blank'} rel={'noreferrer'}
                        ><small>src</small></Link> : null}
                </Box>

                {generics || types || module.type ?
                    <Typography gutterBottom>
                        <MdInlineCode>
                            {module.type ? <span>{module.type}</span> : null}
                            {generics || types ?
                                <DocGenRendererGenerics generics={(generics || types) as PropType[]}/> : null}
                        </MdInlineCode>
                    </Typography> : null}

                {module.deprecated || module.internal ?
                    <Box mb={1}>
                        {module.deprecated ?
                            <Tooltip title={typeof module.deprecated === 'string' ? module.deprecated : 'no alternative given'}>
                                <Chip label={'deprecated'} color={'warning'} size={'small'} icon={<IcWarn/>}/>
                            </Tooltip> : null}
                        {module.internal ? <Chip label={'internal'} color={'warning'} size={'small'} icon={<IcWarn/>}/> : null}
                    </Box> : null}

                {(isClassProp(module) || isInterfaceProp(module) || isTypeProp(module)) && (module as InterfaceProp).extends ? <Box mb={1}>
                    <Typography>extends <MdInlineCode>{(module as InterfaceProp)?.extends?.map(ex => ex.name).join(', ')}</MdInlineCode></Typography>
                </Box> : null}
                {module.alias ? <Box mb={1}>
                    <Typography>Alias of: <MdInlineCode>{module.alias}</MdInlineCode></Typography>
                </Box> : null}

                {module.description ? <Box mb={1}><Markdown source={module.description}/></Box> : null}

                {module?.properties ?
                    <DocGenParamsTable
                        module={module}
                        definerList={module.properties}
                        title={isTupleProp(module) || isUnionProp(module) ? 'Values' : 'Props'}
                    /> : null}

                {module?.parameters ?
                    <DocGenParamsTable
                        module={module}
                        definerList={module.parameters}
                        title={'Parameters'}
                    /> : null}

                {module?.returns ? <Box mb={2}>
                    <Typography variant={'subtitle1'}>Returns</Typography>
                    {module.returns?.name || module.returns?.type ?
                        <MdInlineCode>
                            <DocGenRendererNameOrTypedValue prop={module.returns} parent={module}/>
                            {// @ts-ignore
                                module.returns?.generics ? <DocGenRendererGenerics generics={module.returns.generics}/> : null}
                        </MdInlineCode> : null}
                    {typeof module.returns.kind === 'undefined' ||
                    module.returns.kind === PropKind.Unknown ||
                    module.returns.kind === PropKind.Type ?
                        null : ' ' + PropKind[module.returns.kind] + ''}
                </Box> : null}
            </Box>
        </Paper>
    </Box>
}
