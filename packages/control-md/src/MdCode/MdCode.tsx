import { TypographyProps } from '@mui/material/Typography'
import React from 'react'
import { MdInlineCode } from '@control-ui/md/MdInlineCode'
import { MdCodeBlock } from '@control-ui/md/MdCodeBlock'

export interface MdCodeProps {
    variant?: TypographyProps['variant']
    language?: string
    fontFamily?: string
    children?: React.ReactNode | React.ReactNode[]
    inline?: boolean
}

export const MdCode: React.ComponentType<MdCodeProps & { pInline?: number }> = ({inline, pInline, ...p}) => {
    return inline ? <MdInlineCode {...p} p={pInline}/> : <MdCodeBlock {...p}/>
}
