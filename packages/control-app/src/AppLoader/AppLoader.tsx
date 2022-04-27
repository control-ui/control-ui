import React from 'react'
import { AppThemeProps } from '@control-ui/app/AppTheme'
import Loadable from 'react-loadable'
import useTheme from '@mui/material/styles/useTheme'
import { LoadingCircular } from '@control-ui/kit/Loading/LoadingCircular'
import { AppThemeDynamic } from '@control-ui/app/AppThemeDynamic'

/**
 *
 * @param children
 * @constructor
 */
export const AppWrapper: React.ComponentType<React.PropsWithChildren<{}>> = ({children}) => {
    const {palette} = useTheme()

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        background: palette.background.default,
    }}>
        {children}
    </div>
}

export const AppLoader = (themeConfig: AppThemeProps, loader: () => Promise<any>, loadingTitle: string): React.FunctionComponent => {
    const App = Loadable({
        loader,
        // eslint-disable-next-line react/display-name
        loading: (props: { error: string, retry: () => void }) => {
            if(props.error) console.error(props.error)

            return props.error ?
                <button onClick={props.retry}>retry</button> :
                <LoadingCircular title={loadingTitle}/>
        },
    })

    // eslint-disable-next-line react/display-name
    return () =>
        <AppThemeDynamic {...themeConfig}>
            <AppWrapper>
                <App/>
            </AppWrapper>
        </AppThemeDynamic>
}
