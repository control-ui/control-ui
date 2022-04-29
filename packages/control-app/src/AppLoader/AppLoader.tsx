import React from 'react'
import { AppThemeProps } from '@control-ui/app/AppTheme'
import Loadable from 'react-loadable'
import { LoadingCircular } from '@control-ui/kit/Loading/LoadingCircular'
import { AppThemeDynamic } from '@control-ui/app/AppThemeDynamic'
import { Alert, Box, Button, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { Theme } from '@mui/material/styles'

const useStyles = makeStyles<Theme>(({palette}) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        background: palette.background.default,
    },
}))

export const AppWrapper: React.ComponentType<React.PropsWithChildren<{}>> = ({children}) => {
    const classes = useStyles()

    return <div className={classes.wrapper}>
        {children}
    </div>
}

export const AppLoader = (
    themeConfig: AppThemeProps,
    loader: () => Promise<any>,
    loadingTitle: string,
    errorMessage: string,
    onError?: (error: any) => void,
): React.FunctionComponent => {
    const App = Loadable({
        loader,
        // eslint-disable-next-line react/display-name
        loading: (props: { error: string, retry: () => void }) => {
            if(props.error && onError) onError(props.error)

            return props.error ?
                <Box m={2}>
                    <Alert severity={'error'}>
                        <Typography gutterBottom>{errorMessage}</Typography>
                        <Button variant={'outlined'} fullWidth onClick={props.retry}>retry</Button>
                    </Alert>
                </Box> :
                <LoadingCircular title={loadingTitle}/>
        },
    })

    // noinspection UnnecessaryLocalVariableJS
    const AppLoaderInstance = () =>
        <AppThemeDynamic {...themeConfig}>
            <AppWrapper>
                <App/>
            </AppWrapper>
        </AppThemeDynamic>
    return AppLoaderInstance
}
