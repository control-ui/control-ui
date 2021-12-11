import React from 'react'
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress'
import Typography, { TypographyTypeMap } from '@material-ui/core/Typography'
import useTheme from '@material-ui/core/styles/useTheme'

export const LoadingCircular = (
    {title, loadingColor, textColor, width = '100%'}:
        {
            title: string
            textColor?: TypographyTypeMap<{}>['props']['color']
            loadingColor?: CircularProgressProps['color']
            width?: string
        },
): React.ReactElement => {
    const {spacing} = useTheme()
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflow: 'auto',
        alignItems: 'center',
        width,
    }}>
        <CircularProgress color={loadingColor || 'secondary'} style={{margin: spacing(2) + 'px auto'}} disableShrink/>
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
