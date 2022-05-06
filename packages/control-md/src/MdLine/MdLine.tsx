import React from 'react'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'
import Typography from '@mui/material/Typography'

export const MdLine: React.ComponentType<React.ComponentPropsWithoutRef<'p'> & ReactMarkdownProps & { dense?: boolean }> = (
    {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        node,
        dense,
        ...p
    },
) => {
    return <Typography {...p} component={'p'} variant={dense ? 'body2' : 'body1'} gutterBottom/>
}
