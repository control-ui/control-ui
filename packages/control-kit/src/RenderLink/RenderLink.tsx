import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'

export const RenderLink: React.ComponentType<React.PropsWithChildren<{
    to: string
}>> = React.forwardRef<HTMLAnchorElement, React.PropsWithChildren & { to: string }>(
    function RenderLinkBase({to, children, ...itemProps}, ref) {
        return -1 === to.indexOf('https://') ?
            <RouterLink {...itemProps} to={to} innerRef={ref}>{children}</RouterLink> :
            <Link {...itemProps} ref={ref} href={to}>{children}</Link>
    },
)
