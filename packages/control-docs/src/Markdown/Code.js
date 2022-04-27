import React from 'react'
import useTheme from '@mui/material/styles/useTheme'
import Typography from '@mui/material/Typography'

export const MdCode = ({variant = 'body1', fontFamily = 'monospace', style = {}, children, ...p}) => {
    const {palette, spacing} = useTheme()
    return <Typography component={'pre'} variant={variant} style={{background: palette.divider, ...style}} gutterBottom>
        <Typography component={'code'} data-code={p.language} style={{fontFamily, padding: '0 ' + spacing(0.5)}}>
            {children}
        </Typography>
    </Typography>
}
