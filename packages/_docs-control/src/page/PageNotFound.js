import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {PageTitle} from '@control-ui/kit/PageContent'
import React from 'react'
import {HeadMeta} from '@control-ui/kit/HeadMeta'
import {Link} from '@control-ui/kit/Link'

function PageNotFound() {
    return (
        <>
            <HeadMeta
                title={'Page Not Found · UI-Schema'}
                description={''}
            />
            <Container maxWidth={'md'} fixed style={{display: 'flex', flexDirection: 'column', flexGrow: 2}}>
                <PageTitle title={'404 Not Found'}/>

                <Paper style={{margin: 12, padding: 24}}>
                    <Typography component={'p'} variant={'body1'}>
                        <span role={'img'} aria-label={'Home Icon'}>🏠</span> <Link to={'/'} primary={'Home'} style={{display: 'inline-block'}}/>
                    </Typography>
                </Paper>
            </Container>
        </>
    )
}

export default PageNotFound
