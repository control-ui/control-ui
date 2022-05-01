import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'

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
    container: {
        display: 'flex',
        overflow: 'auto',
        flexGrow: 1,
    },
}))

export interface LayoutProps {
    Header?: React.ComponentType
    Drawer?: React.ComponentType
    Footer?: React.ComponentType
    Content: React.ComponentType<{ scrollContainer: React.MutableRefObject<null | HTMLDivElement> }>
    containerStyle?: React.CSSProperties
    mainContentStyle?: React.CSSProperties
    mainContentRef?: React.MutableRefObject<null | HTMLDivElement>
    locationPath?: string
    mainId?: string
}

export const Layout: React.ComponentType<React.PropsWithChildren<LayoutProps>> = (
    {
        Header,
        Drawer,
        Footer,
        Content,
        mainContentStyle,
        mainContentRef,
        containerStyle,
        locationPath,
        mainId = 'main-content',
        children,
    },
) => {
    const ref = React.useRef<null | HTMLDivElement>(null)
    const classes = useStyles()

    React.useEffect(() => {
        if(ref.current?.scrollTo) {
            ref.current.scrollTo(0, 0)
        }
        if(mainContentRef && ref) {
            mainContentRef.current = ref.current
        }
    }, [locationPath, ref, mainContentRef])

    const mainStyles: React.CSSProperties = React.useMemo(() => ({
        display: 'flex',
        scrollBehavior: 'smooth',
        flexDirection: 'column',
        overflow: 'auto',
        flexGrow: 1,
        ...(mainContentStyle || {}),
    }), [mainContentStyle])

    return <React.Fragment>
        <CssBaseline/>
        {Header ? <Header/> : null}
        <div className={clsx(classes['@global'], classes.container)} style={containerStyle}>
            {Drawer ? <Drawer/> : null}
            <div
                ref={ref} id={mainId}
                style={mainStyles}
            >
                <Content scrollContainer={ref}/>
            </div>
        </div>
        {Footer ? <Footer/> : null}
        {children}
    </React.Fragment>
}
