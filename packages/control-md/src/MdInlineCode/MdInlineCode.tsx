import React from 'react'
import useTheme from '@mui/material/styles/useTheme'
import Typography from '@mui/material/Typography'
import { MdCodeProps } from '@control-ui/md/MdCode'

// todo: fix invalid children for-non-markdown usage in `MdInlineCode`, `MdCode`

export const MdInlineCode: React.ComponentType<MdCodeProps & { p?: number }> = (
    {
        variant = 'body1', fontFamily = 'monospace', style = {}, p = 0.5,
        children,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        node, language,
        ...props
    },
) => {
    const {palette, spacing} = useTheme()
    return <Typography
        component={'code'} variant={variant}
        style={{
            background: palette.divider,
            fontFamily,
            padding: '0 ' + spacing(p),
            ...style,
        }}
        gutterBottom
        {...props}
    >{children}</Typography>
}
