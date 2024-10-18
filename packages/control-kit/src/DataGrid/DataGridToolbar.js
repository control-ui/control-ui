import React from 'react'
import {lighten} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import Tooltip from '@mui/material/Tooltip'
import { useTheme } from '@mui/material/styles'

export const EnhancedTableToolbar = ({numSelected, title}) => {
    const theme = useTheme()

    return (
        <Toolbar
            sx={{
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(1),
                ...(numSelected > 0 ?
                    theme.palette.mode === 'light'
                        ? {
                            color: theme.palette.secondary.main,
                            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                        }
                        : {
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.secondary.dark,
                        } : {}),
            }}
        >
            {numSelected > 0 ? (
                <Typography style={{flex: '1 1 100%'}} color="inherit" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography style={{flex: '1 1 100%'}} variant="h6" id="tableTitle">
                    {title}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" size={'small'}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list" size={'small'}>
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    )
}
