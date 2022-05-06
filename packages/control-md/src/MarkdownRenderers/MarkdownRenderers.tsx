import React from 'react'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { MdList } from '@control-ui/md/MdList'
import { MdInlineCode } from '@control-ui/md/MdInlineCode'
import { MdBlockquote } from '@control-ui/md/MdBlockquote'
import { MdCode } from '@control-ui/md/MdCode'
import { MdLink } from '@control-ui/md/MdLink'
import {
    MdTable, MdTableHead, MdTableBody,
    MdTableRow, MdTableCell,
} from '@control-ui/md/MdTable'
import { MdHeading } from '@control-ui/md/MdHeading'
import { Components } from 'react-markdown'

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    p: ({node, ...p}) => <Typography {...p} component={'p'} variant={dense ? 'body2' : 'body1'} gutterBottom/>,
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    li: ({node, style = {}, ordered, children, ...p}) =>
        <Typography component={'li'} variant={dense ? 'body2' : 'body1'} style={{fontWeight: 'bold', ...style}}{...p}>
            <span style={{fontWeight: 'normal', display: 'block'}}>{children}</span>
        </Typography>,
})

/**
 * All renderers for basic HTML support
 * @see [remarkjs/react-markdown#node-types](https://github.com/remarkjs/react-markdown#node-types)
 */
export const renderers = (dense?: boolean): Components => ({
    ...renderersBasic(dense),
    ...renderersTable(dense),
    code: ({inline, ...p}) => inline ? <MdInlineCode {...p}/> : <MdCode {...p}/>,
    blockquote: MdBlockquote,
    a: MdLink,
})
