import React from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import visuallyHidden from '@mui/utils/visuallyHidden'

export const IconButtonTooltip: React.FC<{
    title?: string | NonNullable<React.ReactNode>
} & Omit<IconButtonProps, 'title'>> = ({title, children, ...p}) => {
    // todo: to support `disabled` on button, all needs to be wrapped in a `span`
    const btn = <IconButton {...p}>
        {children}
        <span style={visuallyHidden}>{title}</span>
    </IconButton>
    return typeof title === 'undefined' ?
        btn :
        <Tooltip title={title}>
            {btn}
        </Tooltip>
}

