import React from 'react'
import {useHistory, useRouteMatch} from 'react-router-dom'
import {useContentLoader} from '@control-ui/docs/ContentLoader'
import {Head} from '@control-ui/kit/Head'
import {PROCESS_SUCCESS} from '@control-ui/kit/Process'
import {filterRoutes, useRouter} from '@control-ui/app/RouterProvider'

const DocHandler = ({scrollContainer, id, activeDoc, match, hash, Content}) => {
    const {progress, content} = useContentLoader(id, activeDoc)
    const path = match.url

    React.useEffect(() => {
        if(!scrollContainer.current) return

        const timer = window.setTimeout(() => {
            if(hash && progress === PROCESS_SUCCESS) {
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

    return <Content content={content} activeDoc={activeDoc} id={id} progress={progress}/>
}

const findDoc = (routes, id) => filterRoutes(routes, (route) => route.doc === id)

export const DocDetails = ({
                               title, description,
                               headProps = {}, scrollContainer,
                               scope = '',
                               Content, NotFound,
                               matchDocKey = 'docId',
                           }) => {
    const {routes} = useRouter()
    const match = useRouteMatch()
    const history = useHistory()
    const docId = scope + match.params[matchDocKey]
    const activeDoc = docId ? findDoc(routes, docId)[0] : undefined

    return <React.Fragment>
        <Head
            title={title(activeDoc)}
            descrition={description ? description(activeDoc) : undefined}
            {...headProps}
        />
        {docId && activeDoc ? <DocHandler
            id={docId}
            scrollContainer={scrollContainer}
            activeDoc={activeDoc}
            Content={Content}
            match={match}
            hash={history.location.hash}
        /> : <NotFound/>}
    </React.Fragment>
}
