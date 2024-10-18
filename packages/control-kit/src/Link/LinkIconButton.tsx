import React from 'react'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import { RenderLink } from '@control-ui/kit/RenderLink'

export interface LinkIconButtonProps extends IconButtonProps {
    to?: string
}

export const LinkIconButton = ({children, to, size = 'small', ...p}: LinkIconButtonProps) => {
    return <IconButton component={RenderLink} to={to} size={size} {...p}>
        {children}
    </IconButton>
}
