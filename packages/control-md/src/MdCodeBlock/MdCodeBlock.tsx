import { getElementProps } from '@control-ui/md/getElementProps'
import React from 'react'
import Typography from '@mui/material/Typography'
import { MdCodeProps } from '@control-ui/md'

export const MdCodeBlock: React.ComponentType<React.PropsWithChildren<MdCodeProps & { className?: string }>> = (
    {
        variant = 'body1', fontFamily = 'monospace', children,
        ...p
    },
) => {
    return <Typography
        component={'pre'} variant={variant}
        gutterBottom
        // background on `pre`, as fallback for no hljs, which styles `code` and not `pre`
        sx={{
            backgroundColor: 'background.default',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
        }}
        {...getElementProps(p)}
    >
        <Typography
            component={'code'}
            className={p.className}
            sx={{
                fontFamily,
                p: '1em',// same padding as hljs github themes
                display: 'block',
                borderRadius: 1,
            }}
        >
            {children}
        </Typography>
    </Typography>
}
