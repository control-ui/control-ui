import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {Link} from "@material-ui/core";

export const RenderLink = React.forwardRef(({to, children, ...itemProps}, ref) =>
    -1 === to.indexOf('https://') ? <RouterLink {...itemProps} to={to} innerRef={ref} children={children}/> : <Link {...itemProps} href={to} innerRef={ref} children={children}/>
);
