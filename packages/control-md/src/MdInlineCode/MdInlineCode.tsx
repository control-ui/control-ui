import React from 'react'
import Typography from '@mui/material/Typography'
import { MdCodeProps } from '@control-ui/md/MdCode'

// todo: fix invalid children for-non-markdown usage in `MdInlineCode`, `MdCode`

export const MdInlineCode: React.ComponentType<React.PropsWithChildren<MdCodeProps & { p?: number }>> = (
    {
        variant = 'inherit', fontFamily = 'monospace', style = {}, p = 0.5,
        children,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        node, language,
        ...props
    },
) => {
    return <Typography
        component={'code'} variant={variant}
        sx={{
            backgroundColor: 'background.default',
            fontFamily,
            borderRadius: 0.5,
            px: p,
            ...style,
        }}
        gutterBottom
        {...props}
    >{children}</Typography>
}
