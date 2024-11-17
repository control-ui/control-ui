import { TsDocModuleCollectionSimple } from '@control-ui/docs-ts/TsDocModule'
import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import { ScrollUpButton } from '@control-ui/kit/ScrollUpButton'
import { DocRouteModule } from '../content/docs'
import PageNotFound from './PageNotFound'
import { DocDetailsLegacy } from '@control-ui/docs/DocDetails'
import { LinkableHeadlineMenu } from '@control-ui/docs/LinkableHeadline'
import { LoadingCircular } from '@control-ui/kit/Loading'
import { Markdown } from '../component/Markdown'
import { DocsDetailsModules } from './DocsDetailsModules'

export interface DocContentProps<D extends DocRouteModule = DocRouteModule> {
    content: string
    doc: D
    id: string
    progress: string
}

const cachedContent = new Map<string, any>()

const DocContent = <D extends DocRouteModule = DocRouteModule>(props: DocContentProps<D>) => {
    const {
        content,
        doc,
        id,
        progress,
    } = props

    const docCode = doc.docModule
    const [loadingCodeDocumentation, setLoadingCodeDocumentation] = React.useState<boolean>(Boolean(docCode))
    const [codeDocumentation, setCodeDocumentation] = React.useState<TsDocModuleCollectionSimple | undefined>(undefined)

    React.useEffect(() => {
        if(!docCode) {
            setCodeDocumentation(undefined)
            setLoadingCodeDocumentation(false)
            return
        }
        const codeDocsPath = '/docs/' + docCode.package + '/' + docCode.fromPath + '.json'
        const cachedCodeDocs = cachedContent.get(codeDocsPath)
        if(cachedCodeDocs) {
            setCodeDocumentation(cachedCodeDocs)
            setLoadingCodeDocumentation(false)
            return
        }
        const abort = new AbortController()
        setLoadingCodeDocumentation(true)
        fetch(codeDocsPath, {
            signal: abort.signal,
        })
            .then((res) => res.status !== 200 ? Promise.reject(res) : res.json())
            .then((data) => {
                if(abort.signal.aborted) return
                cachedContent.set(codeDocsPath, data)
                setCodeDocumentation(data)
                setLoadingCodeDocumentation(false)
            })
            .catch(e => {
                if(abort.signal.aborted) return
                console.error('error loading module-api docs', docCode, e)
                setLoadingCodeDocumentation(false)
            })
        return () => abort.abort()
    }, [docCode])

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

        {progress === 'success' && !loadingCodeDocumentation ?
            <>
                <div style={{display: 'block', textAlign: 'right', margin: '0 12px'}}>
                    <Link
                        target={'_blank'} rel="noreferrer noopener nofollow" variant={'body2'}
                        href={'https://github.com/control-ui/control-ui/tree/main/packages/_docs-control/src/content/' + id + '.md'}
                    >Edit Page</Link>
                </div>
                <Paper style={{margin: 12, padding: 24, display: 'flex', flexDirection: 'column', borderRadius: 5}} variant={'outlined'}>
                    <Markdown source={mdData}/>
                </Paper>

                {docCode ?
                    <Paper style={{margin: 12, padding: 24, display: 'flex', flexDirection: 'column', borderRadius: 5}} variant={'outlined'}>
                        <DocsDetailsModules codeDocumentation={codeDocumentation}/>
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

        {progress === 'start' || progress === 'progress' || loadingCodeDocumentation ?
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
            Content={DocContent}
            matchDocKey={'docId'}
        />
        <ScrollUpButton scrollContainer={scrollContainer} right={32} color={'secondary'} resetHash/>
    </React.Fragment>
}

export default DocsDetails
