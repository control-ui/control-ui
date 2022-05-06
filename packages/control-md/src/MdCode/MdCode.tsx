import React from 'react'
import useTheme from '@mui/material/styles/useTheme'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { CodeProps } from 'react-markdown/lib/ast-to-react'

export interface MdCodeProps extends Omit<CodeProps, 'children'> {
    variant?: TypographyProps['variant']
    language?: string
    fontFamily?: string
    children?: React.ReactNode | React.ReactNode[]
}

export const MdCode: React.ComponentType<MdCodeProps> = (
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
