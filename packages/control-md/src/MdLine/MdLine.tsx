import { getElementProps } from '@control-ui/md/getElementProps'
import React from 'react'
import Typography from '@mui/material/Typography'

export const MdLine: React.ComponentType<React.ComponentPropsWithoutRef<'p'> & { dense?: boolean }> = (
    {
        dense,
        ...p
    },
) => {
    return <Typography {...getElementProps(p)} component={'p'} variant={dense ? 'body2' : 'body1'} gutterBottom/>
}
