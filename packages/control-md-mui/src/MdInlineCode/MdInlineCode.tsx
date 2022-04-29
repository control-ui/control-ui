import React from 'react'
import useTheme from '@mui/material/styles/useTheme'
import Typography from '@mui/material/Typography'
import { MdCodeProps } from '@control-ui/md-mui/MdCode'

// todo: fix invalid children for-non-markdown usage in `MdInlineCode`, `MdCode`

export const MdInlineCode: React.ComponentType<MdCodeProps> = (
    {
        variant = 'body1', fontFamily = 'monospace', style = {},
        children,
        ...p
    },
) => {
    const {palette, spacing} = useTheme()
    return <Typography
        component={'code'} variant={variant}
        style={{
            background: palette.divider,
            fontFamily,
            padding: '0 ' + spacing(0.5),
            ...style,
        }}
        gutterBottom
        {...p}
    >{children}</Typography>
}
