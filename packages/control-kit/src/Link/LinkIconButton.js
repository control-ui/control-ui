import React from 'react';
import IconButton from '@mui/material/IconButton';
import {RenderLink} from "@control-ui/kit/Route/RenderLink";

export const LinkIconButton = ({children, to, color, style, size = 'small'}) => {
    return <IconButton component={RenderLink} to={to} color={color} style={style} size={size}>
        {children}
    </IconButton>
};
