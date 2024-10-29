import { LoadableLazy } from '@control-ui/kit/LoadableLazy'
import React from 'react'
import IcSearch from '@mui/icons-material/Search'
import InvertColorsIcon from '@mui/icons-material/InvertColors'
import GitHubIcon from '../asset/GitHubIcon'
import { Link as RouterLink, RouteComponentProps, useLocation } from 'react-router-dom'
import { LinkIconButton } from '@control-ui/kit/Link'
import { Header } from '@control-ui/app/Header'
import { useSwitchTheme } from '@control-ui/app/AppTheme'
import { Drawer } from '@control-ui/app/Drawer'
import Nav from './Nav'
import { Logo } from '../asset/Logo'
import { Layout, LayoutProps } from '@control-ui/app/Layout'
import { SearchBox } from './SearchBox'
import { RouteCascade } from '@control-ui/routes/RouteCascade'
import { useSearch } from '@control-ui/docs/DocsSearchProvider'
import { Button } from '@mui/material'
import { getUserCtrlKey, getUserPlatform } from '@control-ui/kit/Helper'
import { IconButtonTooltip } from '@control-ui/kit/IconButtonTooltip'

export const CustomHeaderBase: React.ComponentType = () => {
    const {switchTheme} = useSwitchTheme()
    const {setOpen} = useSearch()
    const platform = getUserPlatform()
    return <Header>
        <RouterLink to={'/'}>
            <Logo width={26} style={{marginLeft: 6, display: 'block'}}/>
        </RouterLink>

        <Button
            variant={'outlined'} color={'inherit'}
            onClick={() => setOpen(o => !o)}
            startIcon={<IcSearch/>}
            size={'small'}
            style={{
                marginLeft: 'auto',
                marginRight: 8,
                borderRadius: 8,
            }}
        >
            <span style={{fontWeight: 'bold', lineHeight: '0.965em', fontSize: '0.875rem', paddingLeft: 6, opacity: 0.8, minWidth: 68}}>
                {getUserCtrlKey(platform)}
                {' + K'}
            </span>
        </Button>

        <LinkIconButton size={'medium'} to={'https://github.com/control-ui/control-ui'} color="inherit" style={{color: 'inherit'}}>
            {/*
                    somehow after build the link classes are mixed up
                    color inherit must be set multiple times
                    otherwise it will be (correct) header-inherit in dev but theme-default in prod
                */}
            <GitHubIcon fill="currentColor"/>
            <span className={'sr-only'}>To Github</span>
        </LinkIconButton>

        <IconButtonTooltip color="inherit" onClick={() => switchTheme()} title={'Switch Theme'}>
            <InvertColorsIcon/>
        </IconButtonTooltip>
    </Header>
}
export const CustomHeader: React.ComponentType = React.memo(CustomHeaderBase)

export const CustomDrawerBase: React.ComponentType = () => {
    return <Drawer drawerWidth={230}>
        <Nav/>
    </Drawer>
}
export const CustomDrawer: React.ComponentType = React.memo(CustomDrawerBase)

/*export const CustomFooterBase: React.ComponentType = () => {
    return <>
    </>
}
export const CustomFooter: React.ComponentType = React.memo(CustomFooterBase)*/

const PageNotFound: React.ComponentType<RouteComponentProps & { scrollContainer: React.MutableRefObject<null | HTMLDivElement> }> = LoadableLazy({
    loader: () => import('../page/PageNotFound'),
    title: 'Not Found',
})

const RoutingBase: LayoutProps['Content'] = (p) =>
    <RouteCascade routeId={'content'} childProps={p} Fallback={PageNotFound}/>
export const Routing: LayoutProps['Content'] = React.memo(RoutingBase)

export const CustomLayout: React.ComponentType = () => {
    const location = useLocation()
    return <Layout
        Header={CustomHeader}
        Drawer={CustomDrawer}
        // Footer={CustomFooter}
        Content={Routing}
        locationPath={location.pathname}
    >
        <SearchBox/>
    </Layout>
}
