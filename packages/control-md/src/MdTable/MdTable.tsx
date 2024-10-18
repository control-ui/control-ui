import React from 'react'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import { useTheme } from '@mui/material/styles'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { TableCellProps, TableRowProps } from 'react-markdown/lib/ast-to-react'

export const MdTable: React.ComponentType<React.PropsWithChildren & React.ComponentPropsWithoutRef<'table'> & ReactMarkdownProps & { dense?: boolean }> = (
    {
        dense, children,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        node,
        ...p
    },
) => {
    // todo: check TableHead and TableFooter support
    const {spacing} = useTheme()
    return <TableContainer>
        <Table size={'small'} style={{margin: '0 0 ' + spacing(dense ? 1 : 3) + ' 0'}} {...p}>{children}</Table>
    </TableContainer>
}

export const MdTableHead: React.ComponentType<React.PropsWithChildren & React.ComponentPropsWithoutRef<'thead'> & ReactMarkdownProps> = (
    {
        children,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        node,
        ...p
    },
) =>
    <TableHead {...p}>{children}</TableHead>

export const MdTableBody: React.ComponentType<React.PropsWithChildren & React.ComponentPropsWithoutRef<'tbody'> & ReactMarkdownProps> = (
    {
        children,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        node,
        ...p
    },
) =>
    <TableBody {...p}>{children}</TableBody>

export const MdTableRow: React.ComponentType<React.PropsWithChildren & TableRowProps> = (
    {
        children,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isHeader,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        node,
        ...p
    },
) =>
    <TableRow {...p}>{children}</TableRow>

export const MdTableCell: React.ComponentType<React.PropsWithChildren & TableCellProps & { dense?: boolean }> = (
    {
        dense, style,
        children, isHeader,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        node,
        ...p
    },
) =>
    // @ts-ignore
    <TableCell
        component={isHeader ? 'th' : 'td'}
        size={dense ? 'small' : undefined}
        {...p}
        style={{fontWeight: isHeader ? 'bold' : 'inherit', ...style}}
    >{children}</TableCell>
