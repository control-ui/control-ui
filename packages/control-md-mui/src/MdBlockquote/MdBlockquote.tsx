import React from 'react'
import Paper from '@mui/material/Paper'
import useTheme from '@mui/material/styles/useTheme'
import Typography from '@mui/material/Typography'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'

export const MdBlockquote: React.ComponentType<React.ComponentPropsWithoutRef<'blockquote'> & ReactMarkdownProps> = p => {
    const {palette, spacing} = useTheme()
    return <Paper elevation={3} style={{margin: spacing(2) + ' 0 ' + spacing(4) + ' 0'}}>
        <Typography
            {...p}
            component={'blockquote'} variant={'body1'}
            style={{padding: spacing(2) + ' ' + spacing(4) + ' ' + spacing(0.5) + ' ' + spacing(6), position: 'relative', borderLeft: '0 solid ' + palette.divider}}
        />
    </Paper>
}
