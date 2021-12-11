import React from 'react'
import {useRouteMatch} from 'react-router-dom'
import {Paper, Link} from '@material-ui/core'
import {ScrollUpButton} from '@control-ui/kit/ScrollUpButton'
import PageNotFound from './PageNotFound'
import {DocDetails} from '@control-ui/docs/DocDetails'
import {HeadlineMenu} from '@control-ui/docs/LinkableHeadline'
import {PROCESS_ERROR, PROCESS_NOT_FOUND, PROCESS_PROGRESS, PROCESS_START, PROCESS_SUCCESS} from '@control-ui/kit/Process'
import {LoadingCircular} from '@control-ui/kit/Loading/LoadingCircular'
import {Markdown} from '../component/Markdown'

const DocContent = ({content, id, progress}) => {
    return <>
        {progress === PROCESS_NOT_FOUND ? <PageNotFound/> : null}

        {progress === PROCESS_SUCCESS ?
            <>
                <Paper style={{margin: 12, padding: '0 12px', display: 'flex', flexDirection: 'column', overflowX: 'auto', flexShrink: 0, background: 'transparent'}} elevation={4} variant={'outlined'}>
                    <HeadlineMenu disableNavLink/>
                </Paper>
                <div style={{display: 'block', textAlign: 'right', margin: '0 12px'}}>
                    <Link
                        target={'_blank'} rel="noreferrer noopener nofollow"
                        href={'https://bitbucket.org/bemit_eu/control-ui/src/master/packages/_docs-control/src/content/' + id + '.md'}
                    >Edit Page</Link>
                </div>
                <Paper style={{margin: 12, padding: 24, display: 'flex', flexDirection: 'column'}} elevation={4}>
                    {progress === PROCESS_START || progress === PROCESS_PROGRESS ?
                        <LoadingCircular title={'Loading Docs'}/> :
                        progress === PROCESS_ERROR ?
                            'error' :
                            <React.Fragment>
                                <Markdown source={content}/>
                            </React.Fragment>}
                </Paper>
            </> : null}

        {progress === PROCESS_START || progress === PROCESS_PROGRESS ?
            <LoadingCircular title={'Loading Docs'}/> :
            progress === PROCESS_ERROR ?
                'Error loading page.' : null}
    </>
}

const DocsDetails = ({scrollContainer}) => {
    const match = useRouteMatch()
    return <React.Fragment>
        <DocDetails
            scrollContainer={scrollContainer}
            title={activeDoc => activeDoc && activeDoc.nav && activeDoc.nav.label ?
                activeDoc.nav.label + ' · Control-UI' : 'Control-UI Documentation'}
            NotFound={PageNotFound}
            scope={match.url.split('/')[1] + '/'}
            Content={DocContent}
        />
        <ScrollUpButton scrollContainer={scrollContainer}/>
    </React.Fragment>
}

export default DocsDetails
