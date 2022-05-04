import React from 'react'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer'
import { useDrawer } from '../DrawerProvider'
import useTheme from '@mui/material/styles/useTheme'

export interface CustomDrawerProps {
    drawerWidth?: number
    floatEndsAt?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Drawer: React.FC<React.PropsWithChildren<CustomDrawerProps & Omit<DrawerProps, 'open' | 'classes' | 'className'>>> = (
    {
        variant = 'persistent',
        drawerWidth, children,
        sx = {},
        floatEndsAt = 'md',
        ...props
    },
) => {
    const {open} = useDrawer()
    const theme = useTheme()
    return <MuiDrawer
        variant={variant}
        className={open ? undefined : 'sr-only'}
        sx={{
            overflow: 'auto',
            position: 'absolute',
            top: 48,
            bottom: 0,
            [theme.breakpoints.up(floatEndsAt)]: {
                height: '100%',
                position: 'relative',
                top: 0,
            },
            '& .MuiDrawer-paper': {
                // todo: check why position is overwritten when using `useStyles` also in `AppLoader`
                position: 'relative !important' as 'relative',
                whiteSpace: 'nowrap',
                overflowX: open ? undefined : 'hidden',
                width: open ? drawerWidth : 0,
                transition:
                    open ?
                        theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }) :
                        theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                /*[theme.breakpoints.up('sm')]: {
                    width: open ? undefined : 0,
                },*/
            },
            ...sx,
        }}
        open={open}
        {...props}
    >
        {children}
    </MuiDrawer>
}
