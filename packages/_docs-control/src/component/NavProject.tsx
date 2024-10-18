import React from 'react'
import GitHubIcon from '../asset/GitHubIcon'
import { Link, Typography } from '@mui/material'

export default function NavProject() {
    return <React.Fragment>
        <Typography component={'p'} variant={'body1'}>
            <GitHubIcon style={{marginTop: -2}}/> <Link href={'https://github.com/control-ui/control-ui'}>Project, Issues</Link>
        </Typography>
    </React.Fragment>
}
