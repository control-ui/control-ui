import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'

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
        containerStyle = {},
        locationPath,
        mainId = 'main-content',
        children,
    },
) => {
    const ref = React.useRef<null | HTMLDivElement>(null)

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
        <div style={{
            display: 'flex',
            overflow: 'auto',
            flexGrow: 1,
            ...containerStyle,
        }}>
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
