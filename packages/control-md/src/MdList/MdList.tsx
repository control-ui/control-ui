import React from 'react'
import useTheme from '@mui/material/styles/useTheme'
import { OrderedListProps, UnorderedListProps } from 'react-markdown/lib/ast-to-react'

export const MdList: React.ComponentType<(UnorderedListProps | OrderedListProps) & {
    dense?: boolean
}> = (p) => {
    const {spacing} = useTheme()
    const Comp = p.ordered ? 'ol' : 'ul'
    return <Comp
        style={{
            margin: spacing(p.dense ? 1 : 2) + ' 0 ' + spacing(p.dense ? 1 : 2) + ' ' + spacing(p.dense ? 1 : 2),
            paddingLeft: spacing(p.dense ? 2 : 4),
        }}
    >{p.children}</Comp>
}
