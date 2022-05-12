import React from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import { LoadingProps } from '@control-ui/kit/Loading/Loading'

export const LoadingLinear = ({title, loadingColor, textColor, width = '100%'}: LoadingProps): React.ReactElement => {
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflow: 'auto',
        width,
    }}>
        <LinearProgress color={loadingColor || 'secondary'}/>
        {title ?
            <Typography
                component={'p'} variant={'overline'}
                style={{
                    textAlign: 'center',
                    fontSize: '1em',
                }}
                align={'center'}
                color={textColor || 'textSecondary'}>
                {title}
            </Typography> : null}
    </div>
}
