import React from 'react'
import useTheme from '@mui/material/styles/useTheme'
import { LiProps, OrderedListProps, UnorderedListProps } from 'react-markdown/lib/ast-to-react'
import Typography from '@mui/material/Typography'

export const MdList: React.ComponentType<(UnorderedListProps | OrderedListProps) & {
    dense?: boolean
}> = (
    {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        node, dense,
        ordered,
        children,
        ...p
    },
) => {
    const {spacing} = useTheme()
    const Comp = ordered ? 'ol' : 'ul'
    return <Comp
        {...p}
        style={{
            margin: spacing(dense ? 1 : 2) + ' 0 ' + spacing(dense ? 1 : 2) + ' ' + spacing(dense ? 1 : 2),
            paddingLeft: spacing(dense ? 2 : 4),
        }}
    >{children}</Comp>
}

export const MdListItem: React.ComponentType<LiProps & {
    dense?: boolean
}> = (
    {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        node, ordered,
        dense, style = {},
        children,
        ...p
    },
) =>
    <Typography component={'li'} variant={dense ? 'body2' : 'body1'} style={{fontWeight: 'bold', ...style}}{...p}>
        <span style={{fontWeight: 'normal', display: 'block'}}>{children}</span>
    </Typography>
