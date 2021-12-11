import React from "react";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";

export const MdBlockquote = p => {
    const {palette, spacing} = useTheme();
    return <Paper elevation={3} style={{margin: spacing(2) + 'px 0 ' + spacing(4) + 'px 0'}}>
        <Typography
            {...p} component={'blockquote'} variant={'body1'}
            style={{padding: spacing(2) + 'px ' + spacing(4) + 'px ' + spacing(0.5) + 'px ' + spacing(6) + 'px', position: 'relative', borderLeft: '0 solid ' + palette.divider}}/>
    </Paper>
};
