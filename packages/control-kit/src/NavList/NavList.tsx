import React from 'react'
import Divider from '@mui/material/Divider'
import useTheme from '@mui/material/styles/useTheme'
import List, { ListProps } from '@mui/material/List'
import { ListItemLink, ListItemLinkProps } from '@control-ui/kit/List/LinkList'
import ListItemText from '@mui/material/ListItemText'
import { ListCollapse } from '@control-ui/kit/List/ListCollapse'
import ListItemIcon from '@control-ui/kit/List/ListItemIcon'
import { useLocation } from 'react-router-dom'
import { Route } from '@control-ui/routes/Route'
import ListItemButton from '@mui/material/ListItemButton'
import { TypographyProps } from '@mui/material/Typography'

export interface NavListNestedProps<C = any> {
    routes: Route<C>[]
    filter?: (route: Route<C>) => boolean
    dense?: boolean
    disableNavLink?: ListItemLinkProps['disableNavLink']
    itemStyle?: {}
    divider?: boolean
    // for e.g. closing nav on mobile when clicking on item
    onClick?: () => void
    level?: number
    renderSecondary?: (route: Route<C>) => undefined | string | React.ReactNode
    primaryTypographyProps?: TypographyProps
    secondaryTypographyProps?: TypographyProps
}

export const NavListNestedBase = (
    {
        routes, filter,
        dense, itemStyle = {}, divider = false,
        onClick, level = 1, disableNavLink = false,
        primaryTypographyProps, secondaryTypographyProps,
        renderSecondary,
    }: NavListNestedProps,
): React.ReactElement => {
    const {spacing, palette} = useTheme()
    const location = useLocation()

    const filteredRoutes = React.useMemo(() => filter ? routes?.filter(filter) : routes, [routes, filter])

    return (filteredRoutes?.map((route, i) => {
        const hasRoutes = route.routes
        const active = route.nav?.toSection ?
            route.nav.toSection instanceof RegExp ? route.nav.toSection.test(location.pathname) :
                location.pathname.indexOf(route.nav.toSection + '/') === 0 ||
                location.pathname === route.nav.toSection :
            typeof route.nav?.to === 'string' ?
                (hasRoutes && location.pathname.indexOf(route.nav.to + '/') === 0) ||
                location.pathname === route.nav.to :
                false

        return <React.Fragment key={i}>
            {hasRoutes ?
                <>
                    {divider || route?.nav?.divider ? <Divider/> : null}
                    <ListCollapse
                        label={route?.nav?.label} component={'nav'} dense={dense}
                        // @ts-ignore
                        toggleSelected={active}
                        // @ts-ignore
                        style={{
                            paddingLeft: spacing(level + 1),
                            background: active ? palette.background.paper : 'transparent',
                        }}
                        initialOpen={route?.nav?.initialOpen ? true : undefined}
                        // @ts-ignore
                        forceOpen={(route?.nav?.to || route?.nav?.toSection ? active : undefined)}
                    >
                        <NavListNested
                            // @ts-ignore
                            routes={route.routes} filter={filter}
                            dense={dense} divider={divider} onClick={onClick}
                            itemStyle={itemStyle} level={level + 1}
                        />
                    </ListCollapse>
                </> :
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
                    </ListItemButton>}
        </React.Fragment>
    }) || null) as unknown as React.ReactElement
}

export const NavListNested = React.memo(NavListNestedBase)

export const NavList = (props: ListProps): React.ReactElement => <List {...props} component={'nav'}/>
