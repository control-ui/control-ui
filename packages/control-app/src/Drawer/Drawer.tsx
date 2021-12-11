import React from 'react'
import clsx from 'clsx'
import { makeStyles, Drawer as MuiDrawer } from '@material-ui/core'
import { useDrawer } from '../DrawerProvider'

export type drawerWidth = number | 170

export interface DrawerProps {
    drawerWidth?: drawerWidth
}

const useStyles = makeStyles(theme => ({
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
        width: ({drawerWidth = 170}: { drawerWidth?: drawerWidth }) => drawerWidth,
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

export const Drawer = ({drawerWidth, children}: React.PropsWithChildren<DrawerProps>): React.ReactElement => {
    const classes = useStyles({drawerWidth})
    const {open} = useDrawer()
    return <MuiDrawer
        variant="persistent"
        className={open ? undefined : 'sr-only'}
        classes={{
            root: clsx(classes.drawerRoot),
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
    >
        {children}
    </MuiDrawer>
}
