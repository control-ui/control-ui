import React from 'react'
import {Tooltip} from '@mui/material'

const AccessTooltipIcon = ({title, children}) => <React.Fragment>
    <Tooltip title={title}>
        {children}
    </Tooltip>
    <span className={'sr-only'}>{title}</span>
</React.Fragment>

export {AccessTooltipIcon}
