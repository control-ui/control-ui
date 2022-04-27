import React from 'react'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'
import Typography, { TypographyTypeMap } from '@mui/material/Typography'

export const LoadingLinear = (
    {title, loadingColor, textColor, width = '100%'}:
        {
            title: string
            loadingColor?: LinearProgressProps['color']
            textColor?: TypographyTypeMap['props']['color']
            width?: string
        },
): React.ReactElement => {
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflow: 'auto',
        width,
    }}>
        <LinearProgress color={loadingColor || 'secondary'}/>
        {title ? <Typography
            component={'p'} variant={'overline'}
            style={{
                textAlign: 'center',
                fontSize: '1em',
            }}
            align={'center'}
            color={textColor || 'textSecondary'}>
            {title}
        </Typography> : null}
    </div>
}
