import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@mui/material'

const RenderLinkBase: React.ComponentType<React.PropsWithChildren<React.PropsWithRef<{
    to: string
}>>> = ({to, children, ...itemProps}, ref) =>
    -1 === to.indexOf('https://') ?
        <RouterLink {...itemProps} to={to} innerRef={ref}>{children}</RouterLink> :
        <Link {...itemProps} ref={ref} href={to}>{children}</Link>

export const RenderLink: React.ComponentType<React.PropsWithChildren<{
    to: string
    // @ts-ignore
}>> = React.forwardRef(RenderLinkBase)
