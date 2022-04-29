import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { RenderLink } from '@control-ui/kit/RenderLink'

export interface LinkButtonProps {
    to: string
    color?: string
}

export const LinkButton = (
    {children, to, size = 'small', ...p}: React.PropsWithChildren<ButtonProps & LinkButtonProps>,
): React.ReactElement => {
    return <Button component={RenderLink} to={to} size={size} {...p}>
        {children}
    </Button>
}
