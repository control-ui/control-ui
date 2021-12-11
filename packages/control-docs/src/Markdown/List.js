import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";

export const MdList = (p) => {
    const {spacing} = useTheme();
    const Comp = p.ordered ? 'ol' : 'ul';
    return <Comp
        style={{
            margin: spacing(p.dense ? 1 : 2) + 'px 0 ' + spacing(p.dense ? 1 : 2) + 'px ' + spacing(p.dense ? 1 : 2) + 'px',
            paddingLeft: spacing(p.dense ? 2 : 4)
        }}
    >{p.children}</Comp>;
};
