import React from 'react'
import { DocRoute, useDocs } from '@control-ui/docs/DocsProvider'

const loadedFiles: {
    [id: string]: string
} = {}

export const contentLoader = <D extends DocRoute = DocRoute>(
    loader: (id: string, activeDocs: D) => Promise<{ default: string }>,
    id: string,
    activeDoc: D,
    cb: (text: string | null, error?: string | number) => void,
) => {
    if(loadedFiles[id]) {
        cb(loadedFiles[id])
        return
    }
    try {
        loader(id, activeDoc)
            .then(data => {
                fetch(data.default)
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
    const [progress, setProgress] = React.useState('')
    const [loadedDoc, setLoadedDoc] = React.useState('')

    if(!loader) {
        console.error('useContentLoader: missing `loader`, did you forget the `DocsProvider`?')
    }

    React.useEffect(() => {
        setProgress('start')
        contentLoader(loader, id, activeDoc, (data, status) => {
            if(status) {
                setProgress(status === 'MODULE_NOT_FOUND' ? 'not-found' : 'error')
                setLoadedDoc('')
            } else if(typeof data === 'string') {
                setLoadedDoc(data)
                setProgress('success')
            }
        })
    }, [activeDoc, loader, setLoadedDoc, id])

    return {
        content: loadedDoc,
        progress,
    }
}
