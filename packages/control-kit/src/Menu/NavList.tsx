import React from 'react'
import Divider from '@material-ui/core/Divider'
import { lighten, darken } from '@material-ui/core/styles/colorManipulator'
import useTheme from '@material-ui/core/styles/useTheme'
import List, { ListProps } from '@material-ui/core/List'
import { ListItemLink, ListItemLinkProps } from '@control-ui/kit/List/LinkList'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { ListCollapse } from '@control-ui/kit/List/ListCollapse'
import ListItemIcon from '@control-ui/kit/List/ListItemIcon'
import { useLocation } from 'react-router-dom'

//
// todo: unify interfaces in `app`/`kit`, currently `RouteComponent`, `RouteNav`, `Route` are duplicated
//

export interface RouteComponent<C> {
    exact?: boolean
    component: Promise<C>
}

export interface RouteNav {
    to: string
    toSection?: string | RegExp
    label: string
    divider?: boolean
    initialOpen?: boolean
    icon?: any
}

export interface Route<C = any> {
    'path'?: string
    nav?: RouteNav
    routes?: Route<C>[]
    config?: { [k: string]: RouteComponent<C> }
}

export interface NavListNestedProps {
    routes: Route[]
    routeId?: string
    filter?: (route: Route) => boolean
    dense?: boolean
    disableNavLink?: ListItemLinkProps['disableNavLink']
    itemStyle?: {}
    divider?: boolean
    // for e.g. closing nav on mobile when clicking on item
    onClick?: () => void
    level?: number
}

export const NavListNested = (
    {
        routes, routeId = '', filter,
        dense, itemStyle = {}, divider = false,
        onClick, level = 1, disableNavLink = false,
    }: NavListNestedProps,
): React.ReactElement => {
    const {spacing, palette} = useTheme()
    const location = useLocation()

    // @ts-ignore
    return <>{routes?.filter(filter).map((route, i) => {
        // @ts-ignore
        const hasRoutes = route.routes || (routeId && route[routeId] && route[routeId].routes)
        const active = route.nav?.toSection ?
            route.nav.toSection instanceof RegExp ? route.nav.toSection.test(location.pathname) :
                location.pathname.indexOf(route.nav.toSection + '/') === 0 ||
                location.pathname === route.nav.toSection :
            typeof route.nav?.to === 'string' ?
                (hasRoutes && location.pathname.indexOf(route.nav.to + '/') === 0) ||
                location.pathname === route.nav.to
                : false

        return <React.Fragment key={i}>
            {hasRoutes ?
                <>
                    {divider || route?.nav?.divider ? <Divider/> : null}
                    <ListCollapse
                        label={route?.nav?.label} component={'nav'} dense={dense}
                        toggleSelected={active}
                        style={{
                            paddingLeft: spacing(level + 1),
                            background: active ?
                                palette.type === 'dark' ?
                                    lighten(palette.background.paper, 0.05) :
                                    darken(palette.background.paper, 0.05)
                                : 'transparent',
                        }}
                        initialOpen={route?.nav?.initialOpen ? true : undefined}
                        forceOpen={(route?.nav?.to || route?.nav?.toSection ? active : undefined)}
                    >
                        <NavListNested
                            /* @ts-ignore */
                            routes={route.routes || route[routeId].routes} routeId={routeId} filter={filter}
                            dense={dense} divider={divider} onClick={onClick}
                            itemStyle={{paddingLeft: spacing(level + 2)}} level={level + 1}
                        />
                    </ListCollapse>
                </> :
                route?.nav?.to ?
                    <ListItemLink
                        style={itemStyle} dense={dense} to={route.nav.to}
                        primary={route.nav.label} onClick={onClick} disableNavLink={disableNavLink}
                    /> :
                    <ListItem
                        button style={itemStyle} dense={dense}
                        onClick={onClick}
                    >
                        {route?.nav?.icon ? <ListItemIcon>{route?.nav?.icon}</ListItemIcon> : null}
                        <ListItemText primary={route?.nav?.label}/>
                    </ListItem>}
        </React.Fragment>
    })}</>
}

export const NavList = (props: ListProps): React.ReactElement => <List {...props} component={'nav'}/>
