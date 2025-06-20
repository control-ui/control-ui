import { getElementProps } from '@control-ui/md/getElementProps'
import Typography, { TypographyProps } from '@mui/material/Typography'
import React from 'react'
import { Components, ExtraProps } from 'react-markdown'

export type MdHeadingProps = React.ComponentPropsWithoutRef<NonNullable<Components['h1']>> & ExtraProps & Omit<TypographyProps, 'variant' | 'component' | 'gutterBottom'>

export const MdHeading: React.FC<MdHeadingProps> = ({node, ...p}) => {
    const variant = node?.tagName
    return <Typography
        {...getElementProps(p)}
        component={variant as React.ElementType}
        variant={variant as TypographyProps['variant']}
        gutterBottom
    >{p.children}</Typography>
}
