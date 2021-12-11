import Typography from '@material-ui/core/Typography'
import React from 'react'

export const MdHeading = ({level, ...p}) =>
    <Typography {...p} component={'h' + level} gutterBottom variant={'h' + level}>{p.children}</Typography>
