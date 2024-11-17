import React from 'react'
import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { ListItemIcon } from '@control-ui/kit/List'
import ListItemText from '@mui/material/ListItemText'
import { TypographyProps } from '@mui/material/Typography'
import ListItemButton from '@mui/material/ListItemButton'
import { SxProps } from '@mui/material/styles'

export interface ListCollapseContentProps {
    label?: string
    labelProps?: TypographyProps<'span', { component?: 'span' }>
    toggleComponent?: React.ElementType
    toggleSelected?: boolean
    toggleDivider?: boolean
    icon?: React.ReactNode
    children: React.ReactNode
    dense?: boolean
    initialOpen?: boolean
    forceOpen?: boolean
    style?: React.CSSProperties
    unmountOnExit?: boolean
}

export const ListCollapseContent: React.ComponentType<ListCollapseContentProps> = (
    {
        label, labelProps,
        toggleComponent, toggleSelected, toggleDivider,
        icon,
        children,
        dense, initialOpen,
        forceOpen,
        style,
        unmountOnExit,
    },
) => {
    const [open, setOpen] = React.useState(forceOpen || initialOpen)

    React.useEffect(() => {
        if(forceOpen) {
            setOpen(forceOpen)
        }
    }, [forceOpen, setOpen])

    return <>
        <ListItemButton
            // todo: https://github.com/mui/material-ui/issues/16846
            // @ts-ignore
            component={toggleComponent}
            selected={toggleSelected} divider={toggleDivider}
            onClick={() => setOpen(o => !o)}
            dense={dense} style={style}
        >
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            {typeof label === 'string' ? <ListItemText primary={label} primaryTypographyProps={labelProps}/> : null}
            {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit={unmountOnExit}>
            {children}
        </Collapse>
    </>
}

export interface ListCollapseProps {
    label?: string
    labelProps?: TypographyProps<'span', { component?: 'span' }>
    toggleComponent?: React.ElementType
    toggleSelected?: boolean
    toggleDivider?: boolean
    children: React.ReactNode
    dense?: boolean
    initialOpen?: boolean
    forceOpen?: boolean
    style?: React.CSSProperties
    unmountOnExit?: boolean
    componentList?: React.ElementType
    sxList?: SxProps
}

export const ListCollapse: React.ComponentType<ListCollapseProps> = (
    {
        label, labelProps,
        toggleComponent, toggleSelected, toggleDivider,
        forceOpen,
        dense, initialOpen, style,
        componentList = 'div',
        sxList,
        unmountOnExit,
        children,
    },
) => {
    return <ListCollapseContent
        label={label} labelProps={labelProps}
        toggleComponent={toggleComponent} toggleSelected={toggleSelected} toggleDivider={toggleDivider}
        dense={dense} style={style}
        initialOpen={initialOpen} forceOpen={forceOpen}
        unmountOnExit={unmountOnExit}
    >
        <List component={componentList} disablePadding sx={sxList}>
            {children}
        </List>
    </ListCollapseContent>
}
