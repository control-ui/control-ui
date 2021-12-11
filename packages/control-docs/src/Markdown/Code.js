import React from 'react'
import useTheme from '@material-ui/core/styles/useTheme'
import Typography from '@material-ui/core/Typography'

export const MdCode = ({variant = 'body1', fontFamily = 'monospace', style = {}, children, ...p}) => {
    const {palette, spacing} = useTheme()
    return <Typography component={'pre'} variant={variant} style={{background: palette.divider, ...style}} gutterBottom>
        <Typography component={'code'} data-code={p.language} style={{fontFamily, padding: '0 ' + spacing(0.5) + 'px'}}>
            {children}
        </Typography>
    </Typography>
}
