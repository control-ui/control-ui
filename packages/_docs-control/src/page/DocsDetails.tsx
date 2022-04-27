import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Paper, Link, Alert, Box } from '@mui/material'
import { ScrollUpButton } from '@control-ui/kit/ScrollUpButton'
import PageNotFound from './PageNotFound'
import { DocDetails } from '@control-ui/docs/DocDetails'
import { LinkableHeadlineMenu } from '@control-ui/docs/LinkableHeadline'
import { PROCESS_ERROR, PROCESS_NOT_FOUND, PROCESS_PROGRESS, PROCESS_START, PROCESS_SUCCESS } from '@control-ui/kit/Process'
import { LoadingCircular } from '@control-ui/kit/Loading/LoadingCircular'
import { Markdown } from '../component/Markdown'
import { DocsDetailsModules } from './DocsDetailsModules'

// @ts-ignore
const DocContent = ({content, doc, id, progress}) => {
    const [loadingModuleDocs, setLoadingModuleDocs] = React.useState<boolean>(false)
    const [modules, setModules] = React.useState<any>(undefined)
    const module = doc.docModule
    React.useEffect(() => {
        setModules(undefined)
        setLoadingModuleDocs(false)
        if(!module) return
        setLoadingModuleDocs(true)
        fetch('/docs-component/' + module.package + '/' + module.fromPath + '.json')
            .then((res) => res.status !== 200 ? Promise.reject(res) : res.json())
            .then((data) => {
                setModules(data)
                setLoadingModuleDocs(false)
            })
            .catch(e => {
                console.error('error loading module-api docs', module, e)
                setLoadingModuleDocs(false)
            })
    }, [module])

    console.log('modules', modules)

    return <>
        {progress === PROCESS_NOT_FOUND ? <PageNotFound/> : null}

        {progress === PROCESS_SUCCESS && !loadingModuleDocs ?
            <>
                <div style={{display: 'block', textAlign: 'right', margin: '0 12px'}}>
                    <Link
                        target={'_blank'} rel="noreferrer noopener nofollow" variant={'body2'}
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
                {doc.docModule ?
                    <Paper style={{margin: 12, padding: 24, display: 'flex', flexDirection: 'column'}} elevation={4}>
                        <DocsDetailsModules modules={modules}/>
                    </Paper> : null}

                <Paper
                    style={{
                        margin: 12, display: 'flex', flexDirection: 'column', overflowX: 'auto', flexShrink: 0,
                        position: 'sticky', bottom: 12, maxHeight: '90vh',
                    }}
                    elevation={3}
                >
                    <LinkableHeadlineMenu disableNavLink disablePadding btnVariant={'contained'}/>
                </Paper>
            </> : null}

        {progress === PROCESS_START || progress === PROCESS_PROGRESS || loadingModuleDocs ?
            <LoadingCircular title={'Loading Docs'}/> :
            progress === PROCESS_ERROR ?
                <Box m={2}>
                    <Alert severity={'error'}>Error loading page.</Alert>
                </Box> : null}
    </>
}

const DocsDetails: React.ComponentType<{ scrollContainer?: React.RefObject<any> }> = ({scrollContainer}) => {
    const match = useRouteMatch()
    return <React.Fragment>
        <DocDetails
            scrollContainer={scrollContainer}
            title={activeDoc => activeDoc && activeDoc.nav && activeDoc.nav.label ?
                activeDoc.nav.label + ' · Control-UI' : 'Control-UI Documentation'}
            NotFound={PageNotFound}
            scope={match.url.split('/')[1] + '/'}
            // @ts-ignore
            Content={DocContent}
            matchDocKey={'docId'}
        />
        <ScrollUpButton scrollContainer={scrollContainer}/>
    </React.Fragment>
}

export default DocsDetails
