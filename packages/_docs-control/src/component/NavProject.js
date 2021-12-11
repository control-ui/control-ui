import React from "react";
import GithubLogo from "../asset/GithubLogo";
import {Link, Typography} from "@material-ui/core";

export default () => <React.Fragment>
    <Typography component={'p'} variant={'body1'}>
        <GithubLogo style={{marginTop: -2}}/> <Link href={'https://github.com/control-ui/control-ui'}>Project, Issues</Link>
    </Typography>
</React.Fragment>;
