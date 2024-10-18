import React from 'react'
import { useTheme } from '@mui/material/styles'
import { ListItemLink, ListItemLinkProps } from '@control-ui/kit/List/LinkList'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@control-ui/kit/List/ListItemIcon'
import { Route } from '@control-ui/routes/Route'
import ListItemButton from '@mui/material/ListItemButton'
import { TypographyProps } from '@mui/material/Typography'
import { NavListItemProps } from '@control-ui/kit/NavList/NavListItem'

export interface NavListItemAutoProps<R extends Route = Route> extends NavListItemProps<R> {
    disableNavLink?: ListItemLinkProps['disableNavLink']
    itemStyle?: React.CSSProperties
    renderSecondary?: (route: R) => undefined | string | React.ReactNode
    primaryTypographyProps?: TypographyProps<'span', { component?: 'span' }>
    secondaryTypographyProps?: TypographyProps<'p', { component?: 'p' }>
}

export const NavListItemAuto = <R extends Route = Route>(
    {
        route,
        dense, itemStyle = {},
        onClick, level, disableNavLink = false,
        primaryTypographyProps, secondaryTypographyProps,
        renderSecondary,
    }: NavListItemAutoProps<R>,
): React.ReactElement => {
    const {spacing} = useTheme()
    return (
        route?.nav?.to ?
            <ListItemLink
                style={{paddingLeft: spacing(level + 1), ...(itemStyle || {})}}
                dense={dense}
                to={route.nav.to}
                primary={route.nav.label}
                secondary={renderSecondary ? renderSecondary(route) : undefined}
                onClick={onClick}
                disableNavLink={disableNavLink}
                primaryTypographyProps={primaryTypographyProps}
                secondaryTypographyProps={secondaryTypographyProps}
            /> :
            <ListItemButton
                style={{paddingLeft: spacing(level + 1), ...(itemStyle || {})}}
                dense={dense}
                onClick={onClick}
            >
                {route?.nav?.icon ? <ListItemIcon>{route?.nav?.icon}</ListItemIcon> : null}
                <ListItemText
                    primary={route?.nav?.label}
                    secondary={renderSecondary ? renderSecondary(route) : undefined}
                    primaryTypographyProps={primaryTypographyProps}
                    secondaryTypographyProps={secondaryTypographyProps}
                />
            </ListItemButton>) as unknown as React.ReactElement
}
