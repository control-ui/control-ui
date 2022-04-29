import React from 'react'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { Markdown } from '../component/Markdown'
import { DocModuleExport } from './DocGenModule'
import {
    isUnionProp, isTupleProp, PropKind,
    PropType, isFunctionProp,
} from '@structured-types/api'
import { DocGenRendererUnion, DocGenRendererNameOrTypedValue, DocGenRendererFn, DocGenRendererGenerics } from './DocGenRenderer'
import { MdInlineCode } from '@control-ui/md-mui/MdInlineCode'

export const DocGenParamsTable: React.ComponentType<{
    module: DocModuleExport
    definerList: PropType[]
    title?: string
    mt?: number
    mb?: number
}> = ({module, mt, mb, definerList, title}) => {
    return <Box
        mb={typeof mb === 'number' ? mb : 2} mt={typeof mt === 'number' ? mt : 0}
        style={{display: 'flex', flexDirection: 'column', overflow: 'auto'}}
    >
        {title ? <Typography variant={'subtitle1'}>
            {title}
        </Typography> : null}
        <Table style={{overflow: 'auto'}}>
            <TableHead>
                <TableRow>
                    <TableCell size={'small'}>{isTupleProp(module) ? 'Type or Value' : isUnionProp(module) ? 'Value' : 'Name'}</TableCell>
                    <TableCell size={'small'}>Kind</TableCell>
                    <TableCell size={'small'}>Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {definerList.filter(p => !p.name || !p.name.startsWith('aria-')).map((prop, i) =>
                    <TableRow key={i}>
                        <TableCell size={'small'}>
                            {prop.optional ? null :
                                <Tooltip title={'required'}>
                                    <Typography
                                        component={'span'} variant={'body2'} color={'error'}
                                        style={{width: 14, display: 'inline-block', marginLeft: -14}}
                                    ><small>R</small></Typography>
                                </Tooltip>}
                            <MdInlineCode>
                                <DocGenRendererNameOrTypedValue prop={prop} parent={module}/>
                            </MdInlineCode>
                            {prop.parent ? <Typography style={{display: 'block', lineHeight: '1.25', opacity: 0.85}} variant={'caption'}>from: {prop.parent.name}</Typography> : null}
                        </TableCell>
                        <TableCell size={'small'}>
                            {prop.type || prop.kind ?
                                <MdInlineCode>
                                    {isFunctionProp(prop) ?
                                        <DocGenRendererFn prop={prop}/> :
                                        isUnionProp(prop) ?
                                            <DocGenRendererUnion props={prop.properties as PropType[]}/> :
                                            prop.name && prop.type ?
                                                <>
                                                    {prop.type}
                                                    {// @ts-ignore
                                                        prop.generics ? <DocGenRendererGenerics generics={prop.generics}/> : null}
                                                </> :
                                                prop.kind ? PropKind[prop.kind] || prop.kind : prop.type}
                                </MdInlineCode> : null}
                        </TableCell>
                        <TableCell size={'small'}>{prop.description ? <Markdown source={prop.description}/> : '-'}</TableCell>
                    </TableRow>,
                )}
            </TableBody>
        </Table>
    </Box>
}

