import React from 'react'
import clsx from 'clsx'
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@control-ui/kit/List/ListItemIcon'
import * as H from 'history'

export interface ListItemLinkProps {
    icon?: React.ReactNode
    primary: string
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
}

export function ListItemLink(
    {
        icon, primary, to, onClick, disableNavLink = true,
        dense, style, classes = {}, children, exact,
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

    return <ListItem
        button style={style} dense={dense}
        // @ts-ignore
        component={renderLink}
        onClick={onClick}
        className={clsx(classes.listItem)}
        {...(disableNavLink ? {
            disableNavLink: true,
        } : {
            exact: exact,
            activeClassName: 'Mui-selected',
        })}
    >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} className={clsx(classes.listItemText)}/>
        {children}
    </ListItem>
}

export interface LinkListProps {
    label?: string
    dense?: boolean
}

export const LinkList = ({children, label, dense}: React.PropsWithChildren<LinkListProps>): React.ReactElement => {
    return <List dense={dense} component="nav" aria-label={label}>{children}</List>
}
