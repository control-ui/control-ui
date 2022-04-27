import Typography from '@mui/material/Typography'
import React from 'react'

export const MdHeading = ({level, ...p}) =>
    <Typography {...p} component={'h' + level} gutterBottom variant={'h' + level}>{p.children}</Typography>
