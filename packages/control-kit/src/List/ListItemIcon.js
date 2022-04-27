import React from "react";
import ListItemIc from '@mui/material/ListItemIcon';
import makeStyles from "@mui/styles/makeStyles";

const useListItemStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.mode === 'dark' ? theme.palette.primary.main : 'inherit',
    },
}));

export default props => {
    const classes = useListItemStyles();
    return <ListItemIc classes={classes} {...props}/>;
};
