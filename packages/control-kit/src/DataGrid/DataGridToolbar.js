import React from 'react'
import clsx from 'clsx'
import {lighten} from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import {AccessTooltipIcon} from '@control-ui/kit/Tooltip'

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.mode === 'light'
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
}))

export const EnhancedTableToolbar = ({numSelected, title}) => {
    const classes = useToolbarStyles()

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
    )
}
