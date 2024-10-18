import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link'

export interface LinkProps extends MuiLinkProps {
    primary: string | React.ReactNode
    to?: string
}

export const Link: React.ComponentType<LinkProps> = ({primary, ...props}) =>
    <MuiLink component={RouterLink} {...props}>
        {primary}
    </MuiLink>
