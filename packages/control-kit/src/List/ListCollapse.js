import React from 'react'
import {List, Collapse} from '@mui/material'
import {ExpandLess, ExpandMore} from '@mui/icons-material'
import ListItemIcon from '@control-ui/kit/List/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'

export const ListCollapseContent = (
    {
        label, toggleComponent, toggleSelected, toggleDivider,
        icon, children, dense, initialOpen = true,
        forceOpen = undefined,
        style = undefined,
    },
) => {
    const [open, setOpen] = React.useState(forceOpen || initialOpen)

    React.useEffect(() => {
        if(forceOpen) {
            setOpen(forceOpen)
        }
    }, [forceOpen, setOpen])

    return <React.Fragment>
        <ListItem component={toggleComponent} selected={toggleSelected} divider={toggleDivider} button onClick={() => setOpen(o => !o)} dense={dense} style={style}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={label}/>
            {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
            {children}
        </Collapse>
    </React.Fragment>
}

export const ListCollapse = ({
                                 label = '', toggleComponent = undefined, toggleSelected = undefined, toggleDivider = undefined,
                                 forceOpen = undefined,
                                 dense = false, initialOpen = false, style = undefined,
                                 component = 'div', children,
                             }) => {
    return <ListCollapseContent
        label={label} toggleComponent={toggleComponent} toggleSelected={toggleSelected} toggleDivider={toggleDivider}
        dense={dense} style={style} initialOpen={initialOpen} forceOpen={forceOpen}
    >
        <List component={component} disablePadding>
            {children}
        </List>
    </ListCollapseContent>
}
