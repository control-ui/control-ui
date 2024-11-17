import React from 'react'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import List, { ListProps } from '@mui/material/List'
import { ListCollapse } from '@control-ui/kit/List'
import { useLocation } from 'react-router-dom'
import { Route } from '@control-ui/routes/Route'
import { NavListItemProps } from '@control-ui/kit/NavList'
import { SxProps } from '@mui/material/styles'
import { TypographyProps } from '@mui/material/Typography'

export interface NavListNestedProps<R extends Route = Route> {
    routes: R[]
    filter?: (route: R) => boolean
    dense?: boolean
    divider?: boolean
    // for e.g. closing nav on mobile when clicking on item
    onClick?: () => void
    level?: number
    ListItem: React.ComponentType<NavListItemProps<R>>
    labelProps?: TypographyProps<'span', { component?: 'span' }>
    unmountOnExit?: boolean
    sxList?: SxProps
}

export interface NavListNestedInnerProps<R extends Route = Route> extends Omit<NavListNestedProps<R>, 'routes'> {
    route: R
    active: boolean
}

export const NavListNestedInnerBase = <R extends Route = Route>(
    {
        route, active,
        filter,
        dense, divider = false,
        onClick, level = 1,
        labelProps, unmountOnExit, sxList,
        ListItem,
    }: NavListNestedInnerProps<R>,
): React.ReactElement => {
    const {spacing} = useTheme()
    return <>
        {divider || route?.nav?.divider ? <Divider/> : null}
        <ListCollapse
            label={route?.nav?.label} componentList={'nav'} dense={dense}
            toggleSelected={active}
            style={{
                paddingLeft: spacing(level + 1),
            }}
            initialOpen={route?.nav?.initialOpen ? true : undefined}
            forceOpen={(route?.nav?.to || route?.nav?.toSection ? active : undefined)}
            sxList={sxList}
            labelProps={labelProps}
            unmountOnExit={unmountOnExit}
        >
            <NavListNested<R>
                // @ts-ignore
                routes={route.routes}
                filter={filter}
                dense={dense} divider={divider} onClick={onClick}
                level={level + 1}
                ListItem={ListItem}
            />
        </ListCollapse>
    </>
}
export const NavListNestedInner = React.memo(NavListNestedInnerBase) as <R extends Route = Route>(props: NavListNestedInnerProps<R>) => React.ReactElement

export const NavListNestedBase = <R extends Route = Route>(
    {
        routes, filter,
        dense, divider = false,
        onClick, level = 1,
        labelProps, unmountOnExit, sxList,
        ListItem,
    }: NavListNestedProps<R>,
): React.ReactElement => {
    const location = useLocation()

    const filteredRoutes = React.useMemo(() => filter ? routes?.filter(filter) : routes, [routes, filter])

    return (filteredRoutes?.map((route, i) => {
        const hasRoutes = route.routes
        const active = route.nav?.toSection ?
            route.nav.toSection instanceof RegExp ? route.nav.toSection.test(location.pathname) : (
                location.pathname.startsWith(route.nav.toSection + '/') ||
                location.pathname === route.nav.toSection ||
                location.pathname.startsWith(route.nav.to + '/')
            ) :
            typeof route.nav?.to === 'string' ?
                (hasRoutes && location.pathname.startsWith(route.nav.to + '/')) || location.pathname === route.nav.to :
                false

        return <React.Fragment key={i}>
            {hasRoutes ?
                <NavListNestedInner<R>
                    route={route}
                    active={active}
                    filter={filter}
                    dense={dense}
                    divider={divider}
                    onClick={onClick}
                    level={level}
                    labelProps={labelProps}
                    unmountOnExit={unmountOnExit}
                    sxList={sxList}
                    ListItem={ListItem}
                /> :
                <ListItem route={route} level={level} dense={dense} onClick={onClick}/>}
        </React.Fragment>
    }) || null) as unknown as React.ReactElement
}

export const NavListNested = React.memo(NavListNestedBase) as <R extends Route = Route>(props: NavListNestedProps<R>) => React.ReactElement

export const NavList = (props: ListProps): React.ReactElement => <List {...props} component={'nav'}/>
