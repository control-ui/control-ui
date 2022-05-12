import React from 'react'
import Typography, { TypographyTypeMap } from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { LoadingProps } from '@control-ui/kit'

export interface LoadingComponentProps {
    isLoading: boolean
    pastDelay: boolean
    timedOut: boolean
    error: any
    retry: () => void
}

export const loadableLoading =
    (Loading: React.ComponentType<LoadingProps>) =>
        (title: string, errorText: string = 'Error loading component.') => {
            const loadableLoadingComponent: React.ComponentType<LoadingComponentProps & {
                textColor?: TypographyTypeMap<{}>['props']['color']
                width?: string | undefined
            }> = (
                {error, isLoading, timedOut, retry, ...props},
            ) => {
                if(error) {
                    console.error('Loading component failed', error)
                }
                return <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {isLoading ? <Loading {...props} title={title}/> : null}
                    {error ? <Box my={2} style={{display: 'flex', flexDirection: 'column'}}>
                        <Typography color={'error'} gutterBottom>{errorText}</Typography>
                        {typeof error === 'object' && error.code ?
                            <Typography variant={'caption'} gutterBottom>Code: <code>{error.code}</code></Typography> : null}
                        {timedOut ?
                            <Typography variant={'caption'} gutterBottom>Loading component timed out.</Typography> : null}
                        <Box my={1}>
                            <Button fullWidth variant={'outlined'} size={'medium'} onClick={() => retry()}>try again</Button>
                        </Box>
                        <Button fullWidth size={'medium'} onClick={() => window.location.reload()}>full reload</Button>
                    </Box> : null}
                </Box>
            }

            return loadableLoadingComponent
        }
