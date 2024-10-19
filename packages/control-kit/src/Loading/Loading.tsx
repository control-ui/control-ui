import { TypographyTypeMap } from '@mui/material/Typography'

export interface LoadingProps {
    title?: string
    textColor?: TypographyTypeMap['props']['color']
    loadingColor?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit'
    width?: string
}
