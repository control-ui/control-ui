import { Fragment } from 'react'
import GitHubIcon from '../asset/GitHubIcon'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export default function NavProject() {
    return <Fragment>
        <Typography component={'p'} variant={'body1'}>
            <GitHubIcon style={{marginTop: -2}}/> <Link href={'https://github.com/control-ui/control-ui'}>Project, Issues</Link>
        </Typography>
    </Fragment>
}
