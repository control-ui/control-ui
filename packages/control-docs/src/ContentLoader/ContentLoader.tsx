import React from 'react'
import { DocRoute, useDocs } from '@control-ui/docs/DocsProvider'

const loadedFiles: {
    [id: string]: string
} = {}

const contentLoader = <D extends DocRoute = DocRoute>(
    loader: (id: string, activeDocs: D) => Promise<{ default: string }>,
    id: string,
    activeDoc: D,
    cb: (text: string | null, error?: string | number) => void,
    signal?: AbortSignal,
) => {
    try {
        loader(id, activeDoc)
            .then(data => {
                fetch(data.default, {signal: signal})
                    .then(response => response.text())
                    .then(text => {
                        loadedFiles[id] = text
                        cb(text)
                    })
                    .catch((e) => {
                        cb(null, e)
                    })
            })
            .catch((e: any) => {
                cb(null, e.code)
            })
    } catch(e) {
        cb(null, 'MODULE_NOT_FOUND')
    }
}

export const useContentLoader = (id: string, activeDoc: DocRoute) => {
    const {loader} = useDocs()
    const [progress, setProgress] = React.useState(() => {
        return loadedFiles[id] ? 'success' : ''
    })
    const [loadedDoc, setLoadedDoc] = React.useState<null | { id: string, content: string }>(() => {
        if(loadedFiles[id]) {
            return {id: id, content: loadedFiles[id]}
        }
        return null
    })

    if(!loader) {
        console.error('useContentLoader: missing `loader`, did you forget the `DocsProvider`?')
    }

    React.useEffect(() => {
        const abort = new AbortController()

        if(loadedFiles[id]) {
            setLoadedDoc(
                doc =>
                    doc?.id === id
                    && doc?.content === loadedFiles[id]
                        ? doc
                        : {id, content: loadedFiles[id]},
            )
            setProgress('success')
        } else {
            setProgress('start')
        }
        contentLoader(loader, id, activeDoc, (data, status) => {
            if(abort.signal.aborted) return
            if(status) {
                setProgress(status === 'MODULE_NOT_FOUND' ? 'not-found' : 'error')
                if(!loadedFiles[id]) {
                    // keep doc on error, if it was loaded previously
                    setLoadedDoc(null)
                }
            } else if(typeof data === 'string') {
                setLoadedDoc(
                    doc =>
                        doc?.id === id
                        && doc?.content === loadedFiles[id]
                            ? doc
                            : {id, content: loadedFiles[id]},
                )
                setProgress('success')
            }
        }, abort.signal)
        return () => abort.abort()
    }, [activeDoc, loader, setLoadedDoc, id])

    return {
        docBody: loadedDoc,
        progress,
    }
}
