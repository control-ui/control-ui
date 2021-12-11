import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {PageTitle} from "@control-ui/kit/PageContent";
import React from "react";
import {Head} from "@control-ui/kit/Head";
import {Link} from "@control-ui/kit/Link";

function PageNotFound() {
    return (
        <>
            <Head
                title={'Page Not Found · UI-Schema'}
                description={''}
            />
            <Container maxWidth={'md'} fixed style={{display: 'flex', flexDirection: 'column', flexGrow: 2,}}>
                <PageTitle title={'404 Not Found'}/>

                <Paper style={{margin: 12, padding: 24}}>
                    <Typography component={'p'} variant={'body1'}>
                        <span role={'img'} aria-label={'Home Icon'}>🏠</span> <Link to={'/'} primary={'Home'} style={{display: 'inline-block'}}/>
                    </Typography>
                </Paper>
            </Container>
        </>
    );
}

export default PageNotFound
