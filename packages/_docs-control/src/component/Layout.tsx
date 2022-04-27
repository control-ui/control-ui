import React from 'react'
import IconButton from '@mui/material/IconButton'
import IcSearch from '@mui/icons-material/Search'
import InvertColorsIcon from '@mui/icons-material/InvertColors'
import GithubLogo from '../asset/GithubLogo'
import Loadable from 'react-loadable'
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom'
import { AccessTooltipIcon } from '@control-ui/kit/Tooltip'
import { LinkIconButton } from '@control-ui/kit/Link/LinkIconButton'
import { Header } from '@control-ui/app/Header'
import { useSwitchTheme } from '@control-ui/app/AppTheme'
import { Drawer } from '@control-ui/app/Drawer'
import Nav from './Nav'
import { Logo } from '../asset/Logo'
import { LoadingCircular } from '@control-ui/kit/Loading'
import { Layout } from '@control-ui/app/Layout'
import { useSearch } from './SearchProvider'
import { SearchBox } from './SearchBox'

export const CustomHeader: React.ComponentType = () => {
    const {switchTheme} = useSwitchTheme()
    const {setOpen} = useSearch()
    return <Header>
        <RouterLink to={'/'}>
            <Logo width={26} style={{marginLeft: 6, display: 'block'}}/>
        </RouterLink>

        <IconButton color="inherit" onClick={() => setOpen(true)} style={{marginLeft: 'auto'}}>
            <AccessTooltipIcon title={'search'}>
                <IcSearch/>
            </AccessTooltipIcon>
        </IconButton>

        <LinkIconButton size={'medium'} to={'https://github.com/control-ui/control-ui'} color="inherit" style={{color: 'inherit'}}>
            {/*
                    somehow after build the link classes are mixed up
                    color inherit must be set multiple times
                    otherwise it will be (correct) header-inherit in dev but theme-default in prod
                */}
            <GithubLogo fill="currentColor"/>
            <span className={'sr-only'}>To Github</span>
        </LinkIconButton>

        <IconButton color="inherit" onClick={() => switchTheme()}>
            <AccessTooltipIcon title={'Switch Theme'}>
                <InvertColorsIcon/>
            </AccessTooltipIcon>
        </IconButton>
    </Header>
}

export const CustomDrawer: React.ComponentType = () => {
    return <Drawer drawerWidth={230}>
        <Nav/>
    </Drawer>
}

export const CustomFooter: React.ComponentType = () => {
    return <>
        <SearchBox/>
    </>
}


const PageNotFound: React.ComponentType<RouteComponentProps<{ scrollContainer: any }>> = Loadable({
    loader: () => import('../page/PageNotFound'),
    loading: () => <LoadingCircular title={'Not Found'}/>,
})

export const CustomLayout: React.ComponentType = () =>
    <Layout
        Header={CustomHeader}
        Drawer={CustomDrawer}
        Footer={CustomFooter}
        NotFound={PageNotFound}
    />
