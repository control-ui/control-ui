import React from 'react'
import { useLocation } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { RouteCascade } from '@control-ui/app/RouteCascade'
import { RouteComponentProps } from 'react-router'

const useStyles = makeStyles(() => ({
    '@global': {
        '.sr-only': {
            position: 'absolute',
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            border: 0,
        },
    },
}))

export interface LayoutProps<NFP = any> {
    Header?: React.ComponentType<{}>
    Drawer?: React.ComponentType<{}>
    NotFound: React.ComponentType<RouteComponentProps<NFP>>
    Footer?: React.ComponentType<{}>
    mainContentStyle?: React.CSSProperties
    mainContentRef?: React.Ref<HTMLDivElement>
    routeId?: string
}

export const Layout: React.ComponentType<LayoutProps> = (
    {
        Header,
        Drawer,
        NotFound,
        Footer,
        mainContentStyle = {},
        mainContentRef,
        routeId = 'content',
    },
) => {
    const ref = mainContentRef ? mainContentRef : React.useRef(undefined)
    const location = useLocation()
    const classes = useStyles()

    const loc = location.pathname
    React.useEffect(() => {
        // @ts-ignore
        if(ref.current && ref.current.scrollTo) {
            // @ts-ignore
            ref.current.scrollTo(0, 0)
        }
    }, [loc, ref])

    return <React.Fragment>
        <CssBaseline/>
        {Header ? <Header/> : null}
        <div className={classes['@global']} style={{display: 'flex', overflow: 'auto', flexGrow: 1}}>
            {Drawer ? <Drawer/> : null}
            <div
                /* @ts-ignore */
                ref={ref} id={'main-content'}
                style={{
                    display: 'flex',
                    scrollBehavior: 'smooth',
                    flexDirection: 'column',
                    overflow: 'auto',
                    flexGrow: 1,
                    ...mainContentStyle,
                }}
            >
                <RouteCascade
                    routeId={routeId}
                    childProps={{scrollContainer: ref}}
                    Fallback={NotFound}
                />
            </div>
        </div>
        {Footer ? <Footer/> : null}
    </React.Fragment>
}
