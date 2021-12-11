import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";

export const MdInlineCode = ({variant = 'body1', fontFamily = 'monospace', style = {}, ...p}) => {
    const {palette, spacing} = useTheme();
    return <Typography component={'code'} variant={variant} style={{
        background: palette.divider,
        fontFamily,
        padding: '0 ' + spacing(0.5) + 'px',
        ...style,
    }} gutterBottom>{p.children}</Typography>
};
