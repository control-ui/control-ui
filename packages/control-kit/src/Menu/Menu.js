import React from 'react';
import {NavLink as RouterLink} from 'react-router-dom';
import MuiMenuItem from '@mui/material/MenuItem';
import ListItemIcon from "@control-ui/kit/List/ListItemIcon";
import ListItemText from '@mui/material/ListItemText';

export function MenuItem({
                             icon, primary, component,
                             dense, style, innerRef,
                             onClick, selected, children
                         }) {
    return <MuiMenuItem
        button component={component} style={style} dense={dense} selected={selected}
        ref={innerRef} onClick={onClick}
    >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary}/>
        {children}
    </MuiMenuItem>;
}

export function MenuItemLink({
                                 to, ...props
                             }) {
    const renderLink = React.useMemo(() => React.forwardRef((itemProps, ref) =>
        <RouterLink to={to} exact ref={ref} {...itemProps} />
    ), [to],);

    return <MenuItem
        component={renderLink}
        {...props}
    />;
}
