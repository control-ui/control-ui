import Typography, { TypographyProps } from '@mui/material/Typography'
import React from 'react'
import { HeadingProps } from 'react-markdown/lib/ast-to-react'

export type MdHeadingProps = HeadingProps & Omit<TypographyProps, 'variant' | 'component' | 'gutterBottom'>

export const MdHeading: React.FC<MdHeadingProps> = ({level, ...p}) =>
    <Typography
        {...p}
        component={('h' + level) as React.ElementType}
        variant={('h' + level) as TypographyProps['variant']}
        gutterBottom
    >{p.children}</Typography>
