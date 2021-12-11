import React from 'react';
import clsx from "clsx";
import {lighten, makeStyles,} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {AccessTooltipIcon} from "@control-ui/kit/Tooltip";

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

export const EnhancedTableToolbar = ({numSelected, title}) => {
    const classes = useToolbarStyles();

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle">
                    {title}
                </Typography>
            )}

            {numSelected > 0 ? (
                <IconButton aria-label="delete" size={'small'}>
                    <AccessTooltipIcon title="Delete">
                        <DeleteIcon/>
                    </AccessTooltipIcon>
                </IconButton>
            ) : (
                <IconButton aria-label="filter list" size={'small'}>
                    <AccessTooltipIcon title="Filter list">
                        <FilterListIcon/>
                    </AccessTooltipIcon>
                </IconButton>
            )}
        </Toolbar>
    );
};
