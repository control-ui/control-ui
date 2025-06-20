import React from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { useContentLoader } from '@control-ui/docs/ContentLoader'
import { HeadMeta, HeadMetaProps } from '@control-ui/kit/HeadMeta'
import { useRouter } from '@control-ui/routes/RouterProvider'
import { DocRoute } from '@control-ui/docs/DocsProvider'
import { filterRoutes } from '@control-ui/routes/filterRoutes'

export interface DocDetailsContentProps<D extends DocRoute = DocRoute> {
    content: string
    doc: D
    id: string
    progress: string
}

export const DocDetailsRenderer = <D extends DocRoute = DocRoute>(
    {
        id, doc, path, hash, Content,
        scrollContainer, scrollDelay = 75,
    }: {
        // eslint-disable-next-line deprecation/deprecation
        scrollContainer: React.MutableRefObject<HTMLDivElement | null>
        doc: D
        id: string
        hash?: string
        path: string
        scrollDelay?: number
        Content: React.ComponentType<DocDetailsContentProps<D>>
    },
): React.ReactElement => {
    const hasScrolled = React.useRef<boolean>(false)
    const {progress, content: contentStr} = useContentLoader(id, doc)

    React.useEffect(() => {
        const onScroll = () => {
            hasScrolled.current = true
        }
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [hasScrolled])

    React.useEffect(() => {
        if(!scrollContainer.current || progress !== 'success') {
            return
        }
        if(!hash) {
            if(hasScrolled.current) {
                hasScrolled.current = false
                return
            }
            scrollContainer.current?.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            return
        }

        const timer = window.setTimeout(() => {
            // if(hash && progress === 'success') {
            if(hasScrolled.current) {
                hasScrolled.current = false
                return
            }
            hasScrolled.current = false
            const target = scrollContainer.current?.querySelector(hash.replaceAll(/[".:]/g, '\\$&'))
            if(target) {
                target.scrollIntoView()
                // return
            }
            /*}

            if(hasScrolled.current) {
                hasScrolled.current = false
                return
            }
            scrollContainer.current?.scrollTo({top: 0, left: 0, behavior: 'smooth'})*/
            // 75ms time for the browser to render the content / maybe load something already
            // todo: maybe add a "waiting for ref mounting" here, e.g. pass down ref in `Content` and use an interval
        }, scrollDelay)

        return () => {
            window.clearTimeout(timer)
            hasScrolled.current = false
        }
    }, [hash, path, scrollDelay, progress, hasScrolled, scrollContainer])

    return <Content content={contentStr} doc={doc} id={id} progress={progress}/>
}

export const findDocFn = <D extends DocRoute = DocRoute>(routes: D, id: string): D[] =>
    filterRoutes<D>(routes, (route) =>
        typeof route.doc === 'undefined' ?
            false :
            typeof route.doc === 'boolean' ?
                route.path?.slice(1) === id :
                route.doc === id,
    )

export interface DocDetailsProps<D extends DocRoute = DocRoute> {
    title: (doc: D | undefined) => string
    description?: (doc: D | undefined) => string
    docId?: string
    path: string
    hash?: string
    headProps?: Omit<HeadMetaProps, 'title' | 'description'>
    // eslint-disable-next-line deprecation/deprecation
    scrollContainer: React.MutableRefObject<HTMLDivElement | null>
    scrollDelay?: number
    Content: React.ComponentType<DocDetailsContentProps<D>>
    NotFound: React.ComponentType
    findDoc?: (routes: D, id: string) => D[]
}

export const DocDetails = <D extends DocRoute = DocRoute>(
    {
        title, description,
        headProps = {},
        scrollContainer, scrollDelay,
        Content, NotFound,
        docId, path, hash,
        findDoc = findDocFn,
    }: DocDetailsProps<D>,
): React.ReactElement => {
    const {routes} = useRouter()
    const doc = React.useMemo(
        () =>
            docId ? findDoc(routes as D, docId)[0] : undefined,
        [docId, findDoc, routes],
    )

    return <>
        <HeadMeta
            title={title(doc as D)}
            description={description ? description(doc as D) : undefined}
            {...headProps}
        />
        {docId && doc ?
            <DocDetailsRenderer<D>
                id={docId}
                scrollContainer={scrollContainer}
                scrollDelay={scrollDelay}
                doc={doc as D}
                Content={Content}
                path={path}
                hash={hash}
            /> :
            <NotFound/>}
    </>
}

export interface DocDetailsLegacyProps<D extends DocRoute = DocRoute> {
    title: (doc: DocRoute | undefined) => string
    description?: (doc: DocRoute | undefined) => string
    headProps?: Omit<HeadMetaProps, 'title' | 'description'>
    // eslint-disable-next-line deprecation/deprecation
    scrollContainer: React.MutableRefObject<HTMLDivElement | null>
    scope: string
    Content: React.ComponentType<DocDetailsContentProps<D>>
    NotFound: React.ComponentType
    matchDocKey: string
}

export const DocDetailsLegacy = <D extends DocRoute = DocRoute>(
    {
        scope = '',
        matchDocKey,
        ...p
    }: DocDetailsLegacyProps<D>,
): React.ReactElement => {
    const match = useRouteMatch<{ [k: string]: string }>()
    const location = useLocation()
    const docId = scope + match.params[matchDocKey]

    return <DocDetails
        docId={docId}
        hash={location.hash}
        path={match.url}
        {...p}
    />
}
