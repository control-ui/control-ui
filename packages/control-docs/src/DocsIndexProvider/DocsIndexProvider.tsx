import React from 'react'
import { DocsIndexValues } from '@control-ui/docs/createDocsIndex'

export interface DocsIndexContextType<IV extends DocsIndexValues = DocsIndexValues> {
    index: IV
    meta: {
        [id: string]: {
            ref: string
        }
    }
}

const DocsIndexContext = React.createContext<DocsIndexContextType>({index: {}, meta: {}})

export const useDocsIndex = <IV extends DocsIndexValues = DocsIndexValues>(): DocsIndexContextType<IV> => React.useContext<DocsIndexContextType<IV>>(
    DocsIndexContext as unknown as React.Context<DocsIndexContextType<IV>>,
)

export interface DocsIndexProviderProps {
    indexRefs: {
        [id: string]: string
    }
}

export const DocsIndexProvider = ({children, indexRefs}: React.PropsWithChildren<DocsIndexProviderProps>): React.ReactElement => {
    const [contextIndexState, setContextIndexState] = React.useState<DocsIndexContextType>({index: {}, meta: {}})

    React.useEffect(() => {
        Object.keys(indexRefs).forEach((id) => {
            fetch(indexRefs[id])
                .then(r => r.status === 200 ? r.json() : Promise.reject(r))
                .then(r => setContextIndexState(i => ({
                    ...i,
                    meta: {
                        ...i.meta,
                        [id]: {
                            ref: indexRefs[id],
                        },
                    },
                    index: {
                        ...i.index,
                        [id]: r,
                    },
                })))
                .catch(e => console.error('error loading search index', id, indexRefs[id], e))
        })
    }, [indexRefs, setContextIndexState])

    return <DocsIndexContext.Provider value={contextIndexState}>
        {children}
    </DocsIndexContext.Provider>
}
