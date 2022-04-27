import React from "react";
import OpenInNew from "@mui/icons-material/OpenInNew";
import {MdLink} from "@control-ui/docs/Markdown/Link";

export const MdLinkIcon = ({children, translateX = '-2px', translateY = '4px', ...p}) => <MdLink {...p}>
    {children}
    <OpenInNew fontSize={'small'} style={{transform: 'scale(0.6) translate(' + translateX + ',' + translateY + ')'}}/>
</MdLink>;
