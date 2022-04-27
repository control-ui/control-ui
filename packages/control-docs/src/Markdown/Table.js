import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import useTheme from "@mui/material/styles/useTheme";

export const MdTable = (p) => {
    // todo: check TableHead and TableFooter support
    const {spacing} = useTheme();
    return <TableContainer>
        <Table size={'small'} style={{margin: '0 0 ' + spacing(p.dense ? 1 : 3) + ' 0'}}>{p.children}</Table>
    </TableContainer>;
};
