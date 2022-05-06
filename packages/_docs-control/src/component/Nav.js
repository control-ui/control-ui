import React from 'react'
import Divider from '@mui/material/Divider'
import useTheme from '@mui/material/styles/useTheme'
import {ListItemLink} from '@control-ui/kit/List/LinkList'
import {useRouter} from '@control-ui/routes/RouterProvider'
import {NavListNested, NavList, NavListItemAuto} from '@control-ui/kit/NavList'
import {useDrawer} from '@control-ui/app/DrawerProvider'
import {filterRoutesNested} from '@control-ui/routes'

const filter = route => route.nav && !route.nav.footer

const NavListItemAutoMemo = React.memo(NavListItemAuto)
export default ({dense = true}) => {
    const {routes} = useRouter()
    const {setOpen} = useDrawer()
    const {breakpoints} = useTheme()
    const closeOnClick = React.useCallback(() => {
        if(breakpoints.values.md > window.innerWidth) {
            setOpen(false)
        }
    }, [setOpen, breakpoints.values.md])
    const docRoutes = React.useMemo(
        () => filterRoutesNested(routes, filter),
        [routes],
    )

    return <NavList dense={dense}>
        <NavListNested
            routes={docRoutes?.routes || []}
            dense={dense}
            filter={filter}
            onClick={closeOnClick}
            ListItem={NavListItemAutoMemo}
            unmountOnExit
        />
        <Divider/>
        <ListItemLink to={'impress'} primary={'Impress'} dense={dense} showActive onClick={closeOnClick}/>
        <ListItemLink to={'privacy'} primary={'Privacy Policy'} dense={dense} showActive onClick={closeOnClick}/>
    </NavList>
};
