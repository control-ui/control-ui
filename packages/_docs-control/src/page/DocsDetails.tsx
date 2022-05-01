import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Paper, Link, Alert, Box } from '@mui/material'
import { ScrollUpButton } from '@control-ui/kit/ScrollUpButton'
import PageNotFound from './PageNotFound'
import { DocDetailsLegacy } from '@control-ui/docs/DocDetails'
import { LinkableHeadlineMenu } from '@control-ui/docs/LinkableHeadline'
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
        fetch('/docs/' + module.package + '/' + module.fromPath + '.json')
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

    const mdData = React.useMemo(() => {
        if(!content) return undefined
        const lines: string[] = content.split('\n')
        // todo: add correct front-matter extraction, but e.g. `front-matter` is no longer maintained/browser-optimized
        if(lines[0] === '---') {
            const i = lines.slice(1).findIndex((l: string) => l === '---')
            if(i !== -1) {
                lines.splice(0, i + 2)
            }
        }
        return lines.join('\n')
    }, [content])

    return <>
        {progress === 'not-found' ? <PageNotFound/> : null}

        {progress === 'success' && !loadingModuleDocs ?
            <>
                <div style={{display: 'block', textAlign: 'right', margin: '0 12px'}}>
                    <Link
                        target={'_blank'} rel="noreferrer noopener nofollow" variant={'body2'}
                        href={'https://github.com/control-ui/control-ui/tree/main/packages/_docs-control/src/content/' + id + '.md'}
                    >Edit Page</Link>
                </div>
                <Paper style={{margin: 12, padding: 24, display: 'flex', flexDirection: 'column', borderRadius: 5}} variant={'outlined'}>
                    {progress === 'start' || progress === 'progress' ?
                        <LoadingCircular title={'Loading Docs'}/> :
                        progress === 'error' ?
                            'error' :
                            <Markdown source={mdData}/>}
                </Paper>

                {doc.docModule ?
                    <Paper style={{margin: 12, padding: 24, display: 'flex', flexDirection: 'column', borderRadius: 5}} variant={'outlined'}>
                        <DocsDetailsModules modules={modules}/>
                    </Paper> : null}

                <Paper
                    style={{
                        margin: 12, display: 'flex', flexDirection: 'column', overflowX: 'auto', flexShrink: 0,
                        position: 'sticky', bottom: 12, maxHeight: '85vh', borderRadius: 5,
                        maxWidth: 420,
                    }}
                    // variant={'outlined'}
                    elevation={3}
                >
                    <LinkableHeadlineMenu disableNavLink disablePadding btnVariant={'contained'} bindKey={'m'}/>
                </Paper>
            </> : null}

        {progress === 'start' || progress === 'progress' || loadingModuleDocs ?
            <LoadingCircular title={'Loading Docs'}/> :
            progress === 'error' ?
                <Box m={2}>
                    <Alert severity={'error'}>Error loading page.</Alert>
                </Box> : null}
    </>
}

const DocsDetails: React.ComponentType<{ scrollContainer: React.MutableRefObject<HTMLDivElement | null> }> = ({scrollContainer}) => {
    const match = useRouteMatch()
    return <React.Fragment>
        <DocDetailsLegacy
            scrollContainer={scrollContainer}
            title={activeDoc => activeDoc?.nav?.label ?
                activeDoc.nav.label + ' · Control-UI' : 'Control-UI Documentation'}
            NotFound={PageNotFound}
            scope={match.url.split('/')[1] + '/'}
            // @ts-ignore
            Content={DocContent}
            matchDocKey={'docId'}
        />
        <ScrollUpButton scrollContainer={scrollContainer} right={32} color={'secondary'} resetHash/>
    </React.Fragment>
}

export default DocsDetails
