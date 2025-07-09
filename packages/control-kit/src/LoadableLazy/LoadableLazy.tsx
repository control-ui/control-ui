import Box from '@mui/material/Box'
import { Suspense, lazy } from 'react'
import { LoadingCircular } from '@control-ui/kit/Loading'

export const LoadableLazy = (
    {
        loader,
        title,
    }: {
        loader: Parameters<typeof lazy>[0]
        title?: string
    },
) => {
    const LazyComp = lazy(loader)
    return function CompLoadable<TProps extends {}>(props: TProps) {
        return <Suspense
            fallback={
                <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <LoadingCircular title={title}/>
                </Box>
            }
        >
            <LazyComp {...props}/>
        </Suspense>
    }
}

export const LoadableLazy2 = (
    {
        LazyComp,
        title,
    }: {
        LazyComp: any
        title?: string
    },
) => {
    return function CompLoadable<TProps extends {}>(props: TProps) {
        return <Suspense
            fallback={
                <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <LoadingCircular title={title}/>
                </Box>
            }
        >
            <LazyComp {...props}/>
        </Suspense>
    }
}
