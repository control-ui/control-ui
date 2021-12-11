import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {InvertColors as InvertColorsIcon} from '@material-ui/icons';
import GithubLogo from "../asset/GithubLogo";
import Loadable from 'react-loadable';
import {Link as RouterLink} from "react-router-dom";
import {AccessTooltipIcon} from "@control-ui/kit/Tooltip";
import {LinkIconButton} from "@control-ui/kit/Link/LinkIconButton";
import {Header} from "@control-ui/app/Header";
import {useSwitchTheme} from "@control-ui/app/AppTheme";
import {Drawer} from "@control-ui/app/Drawer";
import Nav from "./Nav";
import {Logo} from "../asset/logo";
import {LoadingCircular} from "@control-ui/kit/Loading";
import {Layout} from "@control-ui/app/Layout";

export const CustomHeader = () => {
    const {switchTheme} = useSwitchTheme();
    return <Header>
        <RouterLink to={'/'}>
            <Logo width={26} style={{marginLeft: 6, display: 'block'}}/>
        </RouterLink>

        <LinkIconButton size={'medium'} to={'https://github.com/control-ui/control-ui'} color="inherit" style={{color: 'inherit', marginLeft: 'auto'}}>
            {/*
                    somehow after build the link classes are mixed up
                    color inherit must be set multiple times
                    otherwise it will be (correct) header-inherit in dev but theme-default in prod
                */}
            <GithubLogo fill='currentColor'/>
            <span className={'sr-only'}>To Github</span>
        </LinkIconButton>

        <IconButton color="inherit" onClick={switchTheme}>
            <AccessTooltipIcon title={'Switch Theme'}>
                <InvertColorsIcon/>
            </AccessTooltipIcon>
        </IconButton>
    </Header>;
};

export const CustomDrawer = () => {
    return <Drawer drawerWidth={230}>
        <Nav/>
    </Drawer>;
};

export const CustomFooter = () => {
    return null;
};


const PageNotFound = Loadable({
    loader: () => import('../page/PageNotFound'),
    loading: () => <LoadingCircular title={'Not Found'}/>,
});

export const CustomLayout = () => <Layout
    Header={CustomHeader}
    Drawer={CustomDrawer}
    Footer={CustomFooter}
    NotFound={PageNotFound}
/>;
