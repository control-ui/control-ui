import React from 'react'
import useTheme from '@mui/material/styles/useTheme'
import { OrderedListProps, UnorderedListProps } from 'react-markdown/lib/ast-to-react'

export const MdList: React.ComponentType<(UnorderedListProps | OrderedListProps) & {
    dense?: boolean
}> = (
    {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        node,
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
            margin: spacing(p.dense ? 1 : 2) + ' 0 ' + spacing(p.dense ? 1 : 2) + ' ' + spacing(p.dense ? 1 : 2),
            paddingLeft: spacing(p.dense ? 2 : 4),
        }}
    >{children}</Comp>
}
