import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link'

export interface LinkProps extends MuiLinkProps {
    primary: string | React.ReactElement
    to: string
}

export const Link = ({primary, ...props}: LinkProps): React.ReactElement =>
    // @ts-ignore
    <MuiLink component={RouterLink} {...props}>
        {primary}
    </MuiLink>
