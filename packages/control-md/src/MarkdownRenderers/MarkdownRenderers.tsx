import React from 'react'
import Divider from '@mui/material/Divider'
import { MdList, MdListItem } from '@control-ui/md/MdList'
import { MdBlockquote } from '@control-ui/md/MdBlockquote'
import { MdCode } from '@control-ui/md/MdCode'
import { MdLink } from '@control-ui/md/MdLink'
import {
    MdTable, MdTableHead, MdTableBody,
    MdTableRow, MdTableCell,
} from '@control-ui/md/MdTable'
import { MdHeading } from '@control-ui/md/MdHeading'
import { Components } from 'react-markdown'
import { MdLine } from '@control-ui/md/MdLine'
import { CodeProps } from 'react-markdown/lib/ast-to-react'

/**
 * Renderers for: table, thead, tbody, tr, th, td
 */
export const renderersTable = (dense?: boolean): Components => ({
    table: p => <MdTable {...p} dense={dense}/>,
    thead: MdTableHead,
    tbody: MdTableBody,
    tr: MdTableRow,
    th: p => <MdTableCell {...p} dense={dense}/>,
    td: p => <MdTableCell {...p} dense={dense}/>,
})

/**
 * Renderers for the basic HTML text-elements
 */
export const renderersBasic = (dense?: boolean): Components => ({
    p: p => <MdLine {...p} dense={dense}/>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    hr: ({node, ...p}) => <Divider {...p}/>,
    h1: MdHeading,
    h2: MdHeading,
    h3: MdHeading,
    h4: MdHeading,
    h5: MdHeading,
    h6: MdHeading,
    ul: p => <MdList {...p} dense={dense}/>,
    ol: p => <MdList {...p} dense={dense}/>,
    li: p => <MdListItem{...p} dense={dense}/>,
})

/**
 * All renderers for basic HTML support
 * @see [remarkjs/react-markdown#node-types](https://github.com/remarkjs/react-markdown#node-types)
 */
export const renderers = (dense?: boolean): Components => ({
    ...renderersBasic(dense),
    ...renderersTable(dense),
    code: MdCode as React.ComponentType<CodeProps>,
    blockquote: MdBlockquote,
    a: MdLink,
})
