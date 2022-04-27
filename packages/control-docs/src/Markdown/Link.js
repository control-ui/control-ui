import React from "react";
import Link from "@mui/material/Link";
import {LinkInternal} from "@control-ui/kit/Link/LinkInternal";

export const MdLink = (p) => {
    return -1 === p.href.indexOf('https://') && -1 === p.href.indexOf('http://') ?
        <LinkInternal to={p.href} primary={p.children} color={'primary'} style={{fontWeight: 'bold'}}/> :
        <Link href={p.href} target='_blank' color={'primary'} style={{fontWeight: 'bold'}} rel='noreferrer noopener'>
            {p.children}
        </Link>;
};
