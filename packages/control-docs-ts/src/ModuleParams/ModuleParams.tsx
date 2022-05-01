import React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import {
    isUnionProp, isTupleProp, PropKind,
    PropType, isFunctionProp, hasGenerics,
} from '@structured-types/api'
import { TsDocsModuleRenderer } from '@control-ui/docs-ts/TsDocs'
import { ModuleCodeFn, ModuleCodeGenerics, ModuleCodeNameOrTypedValue, ModuleCodeUnion } from '@control-ui/docs-ts/ModuleCode'

export interface ModuleParamsProps {
    parent: PropType
    params: PropType[]
    mt?: number
    mb?: number
    renderer: TsDocsModuleRenderer
}

export const ModuleParams: React.ComponentType<ModuleParamsProps> = (
    {
        parent, mt, mb, params,
        renderer,
    },
) => {
    const {
        InlineCode,
        Markdown,
    } = renderer
    return <Box
        mb={typeof mb === 'number' ? mb : 2} mt={typeof mt === 'number' ? mt : 0}
        style={{display: 'flex', flexDirection: 'column', overflow: 'auto'}}
    >
        <Table style={{overflow: 'auto'}}>
            <TableHead>
                <TableRow>
                    <TableCell size={'small'}>{isTupleProp(parent) ? 'Type or Value' : isUnionProp(parent) ? 'Value' : 'Name'}</TableCell>
                    <TableCell size={'small'}>Kind</TableCell>
                    <TableCell size={'small'}>Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {params.filter(p => !p.name || !p.name.startsWith('aria-')).map((prop, i) =>
                    <TableRow key={i}>
                        <TableCell size={'small'}>
                            {prop.optional ? null :
                                <Tooltip title={'required'}>
                                    <Typography
                                        component={'span'} variant={'body2'} color={'error'}
                                        style={{width: 14, display: 'inline-block', marginLeft: -14}}
                                    ><small>R</small></Typography>
                                </Tooltip>}
                            <InlineCode>
                                <ModuleCodeNameOrTypedValue prop={prop} parent={parent} renderer={renderer}/>
                            </InlineCode>
                            {prop.parent ? <Typography style={{display: 'block', lineHeight: '1.25', opacity: 0.85}} variant={'caption'}>from: {prop.parent.name}</Typography> : null}
                        </TableCell>
                        <TableCell size={'small'}>
                            {prop.type || prop.kind ?
                                <InlineCode>
                                    {isFunctionProp(prop) ?
                                        <ModuleCodeFn prop={prop} renderer={renderer}/> :
                                        isUnionProp(prop) ?
                                            <ModuleCodeUnion props={prop.properties as PropType[]}/> :
                                            prop.name && prop.type ?
                                                <>
                                                    {prop.type}
                                                    {hasGenerics(prop) && prop.generics ?
                                                        <ModuleCodeGenerics generics={prop.generics}/> : null}
                                                </> :
                                                prop.kind ? PropKind[prop.kind] || prop.kind : prop.type}
                                </InlineCode> : null}
                        </TableCell>
                        <TableCell size={'small'}>{prop.description ? <Markdown source={prop.description}/> : '-'}</TableCell>
                    </TableRow>,
                )}
            </TableBody>
        </Table>
    </Box>
}

