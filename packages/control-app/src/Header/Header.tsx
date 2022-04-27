import React from 'react'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import IcMenu from '@mui/icons-material/Menu'
import { useDrawer } from '@control-ui/app/DrawerProvider'
import { AccessTooltipIcon } from '@control-ui/kit/Tooltip'

export type labelMenu = (open: boolean) => string

export interface HeaderProps {
    // todo: use i18n instead of `labelMenu`
    labelMenu?: labelMenu
    noDrawerToggle?: boolean
    toolbarVariant?: 'regular' | 'dense'
    appBarVariant?: 'elevation' | 'outlined'
    appBarSquare?: boolean
}

export const Header: React.ComponentType<React.PropsWithChildren<HeaderProps>> = (
    {
        children, noDrawerToggle,
        labelMenu = (open: boolean) => (open ? 'Close' : 'Open') + ' Menu',
        toolbarVariant = 'dense', appBarVariant, appBarSquare = false,
    },
) => {
    const {open, setOpen} = useDrawer()

    return <AppBar
        position="static" style={{flexShrink: 0, flexGrow: 0, paddingTop: 2, paddingBottom: 2}}
        variant={appBarVariant} square={appBarSquare}
        enableColorOnDark
    >
        <Toolbar variant={toolbarVariant}>
            {noDrawerToggle ? null : <IconButton
                edge="start"
                color="inherit"
                aria-label={labelMenu(open)}
                onClick={() => setOpen(o => !o)}
            >
                <AccessTooltipIcon title={labelMenu(open)}>
                    <IcMenu/>
                </AccessTooltipIcon>
            </IconButton>}

            {children}
        </Toolbar>
    </AppBar>
}
