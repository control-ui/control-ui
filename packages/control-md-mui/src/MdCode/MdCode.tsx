import React from 'react'
import useTheme from '@mui/material/styles/useTheme'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { CodeProps } from 'react-markdown/lib/ast-to-react'

export interface MdCodeProps extends Omit<CodeProps, 'children' | 'node'> {
    variant?: TypographyProps['variant']
    language?: string
    fontFamily?: string
    children: React.ReactNode | React.ReactNode[]
}

export const MdCode: React.ComponentType<MdCodeProps> = (
    {
        variant = 'body1', fontFamily = 'monospace', style = {}, children,
        ...p
    },
) => {
    const {palette, spacing} = useTheme()
    return <Typography component={'pre'} variant={variant} style={{background: palette.divider, ...style}} gutterBottom>
        <Typography component={'code'} data-code={p.language} style={{fontFamily, padding: '0 ' + spacing(0.5)}}>
            {children}
        </Typography>
    </Typography>
}
