import React from 'react'
import Typography from '@mui/material/Typography'
import { MdCodeProps } from '@control-ui/md'

export const MdCodeBlock: React.ComponentType<React.PropsWithChildren<MdCodeProps>> = (
    {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        node,
        variant = 'body1', fontFamily = 'monospace', style = {}, children,
        language,
        ...p
    },
) => {
    return <Typography component={'pre'} variant={variant} sx={{backgroundColor: 'background.default', borderRadius: 1, ...style}} gutterBottom {...p}>
        <Typography component={'code'} data-code={language} sx={{fontFamily, px: 0.5, display: 'block'}}>
            {children}
        </Typography>
    </Typography>
}
