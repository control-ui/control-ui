import React from "react";
import Switch from '@material-ui/core/Switch';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

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
