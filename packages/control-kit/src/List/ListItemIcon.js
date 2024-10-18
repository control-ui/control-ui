import React from 'react'
import ListItemIc from '@mui/material/ListItemIcon'
import { useTheme } from '@mui/material/styles'

export default ({style = {}, ...props}) => {
    const theme = useTheme()
    return <ListItemIc style={{
        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : 'inherit',
        ...style,
    }} {...props}/>
};
