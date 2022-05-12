import React from 'react'
import {useTheme} from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import UnfoldLess from '@mui/icons-material/UnfoldLess'
import UnfoldMore from '@mui/icons-material/UnfoldMore'
import Tooltip from '@mui/material/Tooltip'
import {DataGridPaginationActions} from '@control-ui/kit/DataGrid/DataGridPagination'

export function DataGridFooter({
                                   dense, toggleDense,
                                   count, rowsPerPage, page, onChangePage, onChangeRowsPerPage,
                                   stickyFooter = true,
                               }) {
    const {palette} = useTheme()

    return (
        <TableFooter style={{position: stickyFooter ? 'sticky' : 'static', left: 0, right: 0, bottom: 0}}>
            <TableRow>
                <TableCell style={{background: palette.background.default}}>
                    <Tooltip title={dense ? 'data-grid.loose' : 'data-grid.compact'}>
                        <IconButton size={'small'} onClick={toggleDense}>
                            {dense ?
                                <UnfoldMore/> :
                                <UnfoldLess/>}
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                    colSpan={5}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    style={{background: palette.background.default}}
                    SelectProps={{
                        inputProps: {'aria-label': 'rows per page'},
                        native: true,
                    }}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                    ActionsComponent={DataGridPaginationActions}
                />
            </TableRow>
        </TableFooter>
    )
}
