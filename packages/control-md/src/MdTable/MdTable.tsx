import { getElementProps } from '@control-ui/md/getElementProps'
import React from 'react'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import { useTheme } from '@mui/material/styles'
import { ExtraProps } from 'react-markdown'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

export const MdTable: React.ComponentType<React.PropsWithChildren & React.ComponentPropsWithoutRef<'table'> & { dense?: boolean }> = (
    {
        dense, children,
        ...p
    },
) => {
    // todo: check TableHead and TableFooter support
    const {spacing} = useTheme()
    return <TableContainer>
        <Table size={'small'} style={{margin: '0 0 ' + spacing(dense ? 1 : 3) + ' 0'}} {...getElementProps(p)}>{children}</Table>
    </TableContainer>
}

export const MdTableHead: React.ComponentType<React.PropsWithChildren & React.ComponentPropsWithoutRef<'thead'>> = (
    {
        children,
        ...p
    },
) =>
    <TableHead {...getElementProps(p)}>{children}</TableHead>

export const MdTableBody: React.ComponentType<React.PropsWithChildren & React.ComponentPropsWithoutRef<'tbody'>> = (
    {
        children,
        ...p
    },
) =>
    <TableBody {...getElementProps(p)}>{children}</TableBody>

export const MdTableRow: React.ComponentType<React.PropsWithChildren & React.ComponentPropsWithoutRef<'tr'>> = (
    {
        children,
        ...p
    },
) =>
    <TableRow {...getElementProps(p)}>{children}</TableRow>

export const MdTableCell: React.ComponentType<React.PropsWithChildren & ExtraProps & { style?: React.CSSProperties, dense?: boolean }> = (
    {
        dense, style,
        children,
        node,
        ...p
    },
) =>
    <TableCell
        component={node?.tagName as 'th' | 'td'}
        size={dense ? 'small' : undefined}
        {...getElementProps(p)}
        style={{fontWeight: node?.tagName === 'th' ? 'bold' : 'inherit', ...style}}
    >{children}</TableCell>
