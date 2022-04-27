import React from 'react'
import clsx from 'clsx'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer'
import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import { useDrawer } from '../DrawerProvider'

const useStyles = makeStyles<Theme>(theme => ({
    drawerRoot: {
        overflow: 'auto',
        position: 'absolute',
        top: 48,
        bottom: 0,
        [theme.breakpoints.up('md')]: {
            height: '100%',
            position: 'relative',
            top: 0,
        },
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: ({drawerWidth = 170}: { drawerWidth?: number }) => drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
        [theme.breakpoints.up('sm')]: {
            width: 0,
        },
    },
}))

export interface CustomDrawerProps {
    drawerWidth?: number
}

export const Drawer: React.FC<React.PropsWithChildren<CustomDrawerProps & Omit<DrawerProps, 'open' | 'classes' | 'className'>>> = (
    {
        variant = 'persistent',
        drawerWidth, children,
        ...props
    },
) => {
    const classes = useStyles({drawerWidth})
    const {open} = useDrawer()
    return <MuiDrawer
        variant={variant}
        className={open ? undefined : 'sr-only'}
        classes={{
            root: clsx(classes.drawerRoot),
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
        {...props}
    >
        {children}
    </MuiDrawer>
}
