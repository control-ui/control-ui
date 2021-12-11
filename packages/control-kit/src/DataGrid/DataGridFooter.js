import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import UnfoldLess from '@material-ui/icons/UnfoldLess';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import {AccessTooltipIcon} from "@control-ui/kit/Tooltip";
import {DataGridPaginationActions} from "@control-ui/kit/DataGrid/DataGridPagination";

export function DataGridFooter({
                                   dense, toggleDense,
                                   count, rowsPerPage, page, onChangePage, onChangeRowsPerPage,
                                   stickyFooter = true,
                               }) {
    const {palette} = useTheme();

    return (
        <TableFooter style={{position: stickyFooter ? 'sticky' : 'static', left: 0, right: 0, bottom: 0}}>
            <TableRow>
                <TableCell style={{background: palette.background.default}}>
                    <AccessTooltipIcon title={dense ? 'data-grid.loose' : 'data-grid.compact'}>
                        <IconButton size={'small'} onClick={toggleDense}>
                            {dense ?
                                <UnfoldMore/> :
                                <UnfoldLess/>}
                        </IconButton>
                    </AccessTooltipIcon>
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
    );
}
