import React from 'react'
import Button, { ButtonProps } from '@material-ui/core/Button'
import { RenderLink } from '@control-ui/kit/Route/RenderLink'

export interface LinkButtonProps {
    to: string
    color?: string
}

export const LinkButton = (
    {children, to, size = 'small', ...p}: React.PropsWithChildren<ButtonProps & LinkButtonProps>,
): React.ReactElement => {
    // @ts-ignore
    return <Button component={RenderLink} to={to} size={size} {...p}>
        {children}
    </Button>
}
