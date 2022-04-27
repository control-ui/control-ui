import React from "react";
import Switch from '@mui/material/Switch';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export const SettingSwitch = ({label, checked, dense, onChange}) => <ListItem component={'label'} dense={dense}>
    <ListItemIcon><Switch
        checked={checked}
        onChange={onChange}
        color="primary"
    /></ListItemIcon>
    <ListItemText style={{cursor: 'pointer'}} primary={label}/>
</ListItem>;

export const SettingRow = ({label, Icon, selected, ...props}) => <ListItem {...props} selected={selected}>
    <ListItemIcon style={{justifyContent: 'center'}}><Icon/></ListItemIcon>
    <ListItemText primary={label}/>
</ListItem>;
