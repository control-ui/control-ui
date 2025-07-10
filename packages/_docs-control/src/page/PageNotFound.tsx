import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { PageTitle } from '@control-ui/kit/PageContent'
import { HeadMeta } from '@control-ui/kit/HeadMeta'
import { Link } from '@control-ui/kit/Link'

export function ContentNotFound() {
    return <Box style={{display: 'flex', flexDirection: 'column'}}>
        <PageTitle title={'404 Not Found'}/>

        <Paper style={{margin: 12, padding: 24}}>
            <Typography component={'p'} variant={'body1'}>
                <span role={'img'} aria-label={'Home Icon'}>🏠</span> <Link to={'/'} primary={'Home'} style={{display: 'inline-block'}}/>
            </Typography>
        </Paper>
    </Box>
}

function PageNotFound() {
    return (
        <>
            <HeadMeta
                title={'Page Not Found · Control-UI'}
                description={''}
            />
            <Container maxWidth={'md'} fixed style={{flexGrow: 2}}>
                <ContentNotFound/>
            </Container>
        </>
    )
}

export default PageNotFound
