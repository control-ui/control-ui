import React from "react";
import ListItemIc from '@material-ui/core/ListItemIcon';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useListItemStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.type === 'dark' ? theme.palette.primary.main : 'inherit',
    },
}));

export default props => {
    const classes = useListItemStyles();
    return <ListItemIc classes={classes} {...props}/>;
};
