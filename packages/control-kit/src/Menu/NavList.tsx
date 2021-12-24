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
import { Route } from '@control-ui/app'

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
    return <>{routes?.filter(filter).map((route, i) => <React.Fragment key={i}>
        {/* @ts-ignore */}
        {route.routes || (routeId && route[routeId] && route[routeId].routes) ?
            <>
                {divider || route?.nav?.divider ? <Divider/> : null}
                <ListCollapse
                    label={route?.nav?.label} component={'nav'} dense={dense}
                    toggleSelected={location.pathname.indexOf(route?.nav?.to + '/') === 0}
                    style={{
                        paddingLeft: spacing(level + 1),
                        background: location.pathname.indexOf(route?.nav?.to + '/') === 0 ?
                            palette.type === 'dark' ? lighten(palette.background.paper, 0.05) :
                                darken(palette.background.paper, 0.05)
                            : 'transparent',
                    }}
                    initialOpen={
                        route?.nav?.initialOpen ||
                        route?.nav?.to ? location.pathname.indexOf(route.nav.to + '/') === 0 : undefined
                    }
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
    </React.Fragment>)}</>
}

export const NavList = (props: ListProps): React.ReactElement => <List {...props} component={'nav'}/>
