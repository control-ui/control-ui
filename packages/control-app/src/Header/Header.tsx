import React from 'react'
import AppBar, { AppBarProps } from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import IcMenu from '@mui/icons-material/Menu'
import { useDrawer } from '@control-ui/app/DrawerProvider'
import { AccessTooltipIcon } from '@control-ui/kit/Tooltip'
import { SxProps } from '@mui/system'

export type labelMenu = (open: boolean) => string

export interface HeaderProps {
    // todo: use i18n instead of `labelMenu`
    labelMenu?: labelMenu
    noDrawerToggle?: boolean
    toolbarVariant?: 'regular' | 'dense'
    toolbarSx?: SxProps
    toolbarStyle?: React.CSSProperties
    appBarVariant?: AppBarProps['variant']
    appBarPosition?: AppBarProps['position']
    appBarSquare?: boolean
    disableColorOnDark?: boolean
    appBarSx?: SxProps
    e2e?: string
}

export const Header: React.ComponentType<React.PropsWithChildren<HeaderProps>> = (
    {
        children, noDrawerToggle,
        labelMenu = (open: boolean) => (open ? 'Close' : 'Open') + ' Menu',
        toolbarVariant = 'dense',
        appBarPosition = 'static',
        appBarVariant,
        appBarSquare = false,
        disableColorOnDark,
        toolbarStyle,
        appBarSx, toolbarSx,
        e2e,
    },
) => {
    const {open, setOpen} = useDrawer()

    return <AppBar
        position={appBarPosition}
        style={{flexShrink: 0, flexGrow: 0, paddingTop: 2, paddingBottom: 2}}
        variant={appBarVariant} square={appBarSquare}
        sx={appBarSx}
        enableColorOnDark={!disableColorOnDark}
        data-e2e={e2e ? e2e + 'appbar' : undefined}
    >
        <Toolbar
            variant={toolbarVariant}
            sx={toolbarSx}
            style={toolbarStyle}
            data-e2e={e2e ? e2e + 'toolbar' : undefined}
        >
            {noDrawerToggle ? null :
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label={labelMenu(open)}
                    onClick={() => setOpen(o => !o)}
                    data-e2e={e2e ? e2e + 'drawer-toggle' : undefined}
                >
                    <AccessTooltipIcon title={labelMenu(open)}>
                        <IcMenu/>
                    </AccessTooltipIcon>
                </IconButton>}

            {children}
        </Toolbar>
    </AppBar>
}
