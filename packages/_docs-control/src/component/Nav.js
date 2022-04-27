import React from 'react'
import Divider from '@mui/material/Divider'
import useTheme from '@mui/material/styles/useTheme'
import {ListItemLink} from '@control-ui/kit/List/LinkList'
import {useRouter} from '@control-ui/app/RouterProvider'
import {NavListNested, NavList} from '@control-ui/kit/Menu/NavList'
import {useDrawer} from '@control-ui/app/DrawerProvider'

export default ({dense = true}) => {
    const {routes} = useRouter()
    const {setOpen} = useDrawer()
    const {breakpoints} = useTheme()
    const closeOnClick = React.useCallback(() => {
        if(breakpoints.values.md > window.innerWidth) {
            setOpen(false)
        }
    }, [setOpen, breakpoints.values.md])

    return <NavList dense={dense}>
        <NavListNested
            routes={routes.routes}
            dense={dense}
            filter={route => route.nav && !route.nav.footer}
            onClick={closeOnClick}
        />
        <Divider/>
        <ListItemLink to={'impress'} primary={'Impress'} dense={dense} showActive onClick={closeOnClick}/>
        <ListItemLink to={'privacy'} primary={'Privacy Policy'} dense={dense} showActive onClick={closeOnClick}/>
    </NavList>
};
