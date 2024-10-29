import React from 'react'
import MuiListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon'
import { useTheme } from '@mui/material/styles'

export function ListItemIcon({style = {}, ...props}: ListItemIconProps) {
    const theme = useTheme()
    return <MuiListItemIcon style={{
        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : 'inherit',
        ...style,
    }} {...props}/>
}
