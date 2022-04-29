import React from 'react'
import clsx from 'clsx'
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@control-ui/kit/List/ListItemIcon'
import * as H from 'history'
import ListItemButton from '@mui/material/ListItemButton'
import { TypographyProps } from '@mui/material/Typography'

export interface ListItemLinkProps {
    icon?: React.ReactNode
    primary: string | React.ReactNode
    secondary?: string | React.ReactNode
    to: string
    dense?: boolean
    // turn off `NavLink` as component, useful for same-page lists
    disableNavLink?: boolean
    exact?: boolean
    style?: React.CSSProperties
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
    classes?: {
        listItem?: string[]
        listItemText?: string[]
    }
    primaryTypographyProps?: TypographyProps
    secondaryTypographyProps?: TypographyProps
}

export function ListItemLink(
    {
        icon,
        to, onClick, disableNavLink = true,
        dense, style, classes = {}, children, exact,
        primary, secondary,
        primaryTypographyProps, secondaryTypographyProps,
    }: React.PropsWithChildren<ListItemLinkProps>,
): React.ReactElement {
    const renderLink: React.ComponentType<React.PropsWithChildren<{
        disableNavLink?: boolean
        // eslint-disable-next-line react/display-name
    }>> = React.useMemo(() => React.forwardRef(({disableNavLink, ...itemProps}, ref) => {
        const Comp: <S = H.LocationState>(...params: Parameters<RouterLink<S>>) => ReturnType<RouterLink<S>> = disableNavLink ? RouterLink : RouterNavLink
        return <Comp
            to={to}
            // @ts-ignore
            innerRef={ref}
            {...itemProps}
        />
    }), [to])

    // @ts-ignore
    return <ListItemButton
        style={style} dense={dense}
        component={renderLink}
        onClick={onClick}
        className={clsx(classes.listItem)}
        {...(
            disableNavLink ?
                {
                    disableNavLink: true,
                } :
                {
                    exact: exact,
                    activeClassName: 'Mui-selected',
                }
        )}
    >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText
            primary={primary}
            secondary={secondary}
            className={clsx(classes.listItemText)}
            primaryTypographyProps={primaryTypographyProps}
            secondaryTypographyProps={secondaryTypographyProps}
        />
        {children}
    </ListItemButton>
}

export interface LinkListProps {
    label?: string
    dense?: boolean
    disablePadding?: boolean
    style?: React.CSSProperties
}

export const LinkList: React.ComponentType<React.PropsWithChildren<LinkListProps>> = (
    {
        children, label,
        style, disablePadding, dense,
    },
) => {
    return <List dense={dense} component="nav" aria-label={label} style={style} disablePadding={disablePadding}>{children}</List>
}
