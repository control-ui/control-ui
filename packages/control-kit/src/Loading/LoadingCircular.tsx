import React from 'react'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'
import Typography, { TypographyTypeMap } from '@mui/material/Typography'
import useTheme from '@mui/material/styles/useTheme'

export const LoadingCircular: React.ComponentType<{
    title: string
    textColor?: TypographyTypeMap['props']['color']
    loadingColor?: CircularProgressProps['color']
    width?: string
}> = (
    {
        title,
        loadingColor,
        textColor,
        width = '100%',
    },
) => {
    const {spacing} = useTheme()
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflow: 'auto',
        alignItems: 'center',
        width,
    }}>
        <CircularProgress color={loadingColor || 'secondary'} style={{margin: spacing(2) + ' auto'}} disableShrink/>
        {title ? <Typography
            component={'p'} variant={'overline'}
            style={{
                textAlign: 'center',
                fontSize: '1em',
            }}
            color={textColor || 'textSecondary'}>
            {title}
        </Typography> : null}
    </div>
}
