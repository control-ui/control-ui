import React from 'react'
import { useTheme } from '@mui/material/styles'
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
    const {palette, spacing} = useTheme()
    return <Typography component={'pre'} variant={variant} style={{background: palette.divider, ...style}} gutterBottom {...p}>
        <Typography component={'code'} data-code={language} style={{fontFamily, padding: '0 ' + spacing(0.5)}}>
            {children}
        </Typography>
    </Typography>
}
