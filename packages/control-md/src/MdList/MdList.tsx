import { getElementProps } from '@control-ui/md/getElementProps'
import React from 'react'
import { useTheme } from '@mui/material/styles'
import { ExtraProps } from 'react-markdown'
import Typography from '@mui/material/Typography'

export const MdList: React.ComponentType<React.PropsWithChildren & ExtraProps & {
    dense?: boolean
}> = (
    {
        node, dense,
        children,
        ...p
    },
) => {
    const {spacing} = useTheme()
    const Comp = node?.tagName as 'ol' | 'ul' || 'ul'
    return <Comp
        {...getElementProps(p)}
        style={{
            margin: spacing(dense ? 1 : 2) + ' 0 ' + spacing(dense ? 1 : 2) + ' ' + spacing(dense ? 1 : 2),
            paddingLeft: spacing(dense ? 2 : 4),
        }}
    >{children}</Comp>
}

export const MdListItem: React.ComponentType<React.PropsWithChildren & {
    style?: React.CSSProperties
    dense?: boolean
}> = (
    {
        dense, style = {},
        children,
        ...p
    },
) =>
    <Typography component={'li'} variant={dense ? 'body2' : 'body1'} style={{fontWeight: 'bold', ...style}}{...getElementProps(p)}>
        <span style={{fontWeight: 'normal', display: 'block'}}>{children}</span>
    </Typography>
