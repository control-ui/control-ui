import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import useTheme from "@material-ui/core/styles/useTheme";

export const MdTable = (p) => {
    // todo: check TableHead and TableFooter support
    const {spacing} = useTheme();
    return <TableContainer>
        <Table size={'small'} style={{margin: '0 0 ' + spacing(p.dense ? 1 : 3) + 'px 0'}}>{p.children}</Table>
    </TableContainer>;
};
