import React from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { useContentLoader } from '@control-ui/docs/ContentLoader'
import { HeadMeta, HeadMetaProps } from '@control-ui/kit/HeadMeta'
import { useRouter } from '@control-ui/routes/RouterProvider'
import { DocRoute } from '@control-ui/docs/DocsProvider'
import { filterRoutes } from '@control-ui/routes/filterRoutes'

// @ts-ignore
const DocHandler = ({scrollContainer, id, activeDoc, match, hash, Content}) => {
    const {progress, content: contentStr} = useContentLoader(id, activeDoc)
    const path = match.url

    React.useEffect(() => {
        if(!scrollContainer.current) return

        const timer = window.setTimeout(() => {
            if(hash && progress === 'success') {
                const target = scrollContainer.current.querySelector(hash)
                if(target) {
                    target.scrollIntoView()
                    return
                }
            }

            scrollContainer.current.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            // 75ms time for the browser to render the content / maybe load something already
            // todo: maybe add a "waiting for ref mounting" here, e.g. pass down ref in `Content` and use an interval
        }, 75)

        return () => window.clearTimeout(timer)
    }, [hash, path, progress, scrollContainer])

    return <Content content={contentStr} doc={activeDoc} id={id} progress={progress}/>
}

export const findDoc = (routes: DocRoute, id: string): DocRoute[] => filterRoutes<DocRoute>(routes, (route) => route.doc === id)

export interface DocDetailsProps {
    title: (doc: DocRoute | undefined) => string
    description?: (doc: DocRoute | undefined) => string
    headProps?: Omit<HeadMetaProps, 'title' | 'description'>
    scrollContainer: React.MutableRefObject<HTMLDivElement | null>
    scope: string
    Content: React.ComponentType
    NotFound: React.ComponentType
    matchDocKey: string
}

export const DocDetails: React.ComponentType<DocDetailsProps> = (
    {
        title, description,
        headProps = {}, scrollContainer,
        scope = '',
        Content, NotFound,
        matchDocKey,
    },
) => {
    const {routes} = useRouter()
    const match = useRouteMatch<{ [k: string]: string }>()
    const location = useLocation()
    const docId = scope + match.params[matchDocKey]
    const activeDoc = React.useMemo(
        () =>
            docId ? findDoc(routes as DocRoute, docId)[0] : undefined,
        [docId, routes],
    )

    return <React.Fragment>
        <HeadMeta
            title={title(activeDoc)}
            description={description ? description(activeDoc) : undefined}
            {...headProps}
        />
        {docId && activeDoc ?
            <DocHandler
                id={docId}
                scrollContainer={scrollContainer}
                activeDoc={activeDoc}
                Content={Content}
                match={match}
                hash={location.hash}
            /> :
            <NotFound/>}
    </React.Fragment>
}
