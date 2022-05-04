import React from 'react'
import { AppThemeProps } from '@control-ui/app/AppTheme'
import Loadable from 'react-loadable'
import { LoadingCircular } from '@control-ui/kit/Loading/LoadingCircular'
import { AppThemeDynamic } from '@control-ui/app/AppThemeDynamic'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'
import useTheme from '@mui/material/styles/useTheme'

export const AppWrapper: React.ComponentType<React.PropsWithChildren<{
    style?: React.CSSProperties
    sx?: SxProps<Theme>
    className?: string
}>> = ({children, sx, className, style}) => {
    const {palette} = useTheme()
    return <Box
        className={className}
        style={style}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100%',
            background: palette.background.default,
            ...(sx || {}),
        }}
    >
        {children}
    </Box>
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
