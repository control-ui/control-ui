import React from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import {MdList} from '@control-ui/docs/Markdown/List'
import {MdInlineCode} from '@control-ui/docs/Markdown/InlineCode'
import {MdBlockquote} from '@control-ui/docs/Markdown/Blockquote'
import {MdCode} from '@control-ui/docs/Markdown/Code'
import {MdLink} from '@control-ui/docs/Markdown/Link'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {MdTable} from '@control-ui/docs/Markdown/Table'
import {MdHeading} from '@control-ui/docs/Markdown/MdHeading'


/**
 * @see https://github.com/rexxars/react-markdown#node-types
 * @param dense
 */
export const renderersTable = (dense) => ({
    table: p => <MdTable {...p} dense={dense}/>,
    thead: p => <TableHead>{p.children}</TableHead>,
    tbody: p => <TableBody>{p.children}</TableBody>,
    tr: p => <TableRow>{p.children}</TableRow>,
    th: p => <TableCell component={'th'} style={{fontWeight: 'bold', ...p.style}}>{p.children}</TableCell>,
    td: p => <TableCell component={'td'} style={{fontWeight: 'inherit', ...p.style}}>{p.children}</TableCell>,
})

/**
 *
 * @see https://github.com/rexxars/react-markdown#node-types
 * @param dense
 */
export const renderersBasic = (dense) => ({
    root: React.Fragment,
    p: p => <Typography {...p} component={'p'} variant={'body1'} gutterBottom/>,
    hr: p => <Divider {...p}/>,
    h1: MdHeading,
    h2: MdHeading,
    h3: MdHeading,
    h4: MdHeading,
    h5: MdHeading,
    h6: MdHeading,
    ul: p => <MdList {...p} dense={dense}/>,
    ol: p => <MdList {...p} dense={dense}/>,
    li: p => <Typography component={'li'} variant={'body1'} style={{fontWeight: 'bold'}}><span style={{fontWeight: 'normal', display: 'block'}}>{p.children}</span></Typography>,
})

/**
 * @see https://github.com/rexxars/react-markdown#node-types
 * @param dense
 */
export const renderers = (dense) => ({
    ...renderersBasic(dense),
    ...renderersTable(dense),
    code: ({inline, ...p}) => inline ? <MdInlineCode {...p}/> : <MdCode {...p}/>,
    blockquote: MdBlockquote,
    a: MdLink,
})
