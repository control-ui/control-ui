import React from 'react'
import { Route } from '@control-ui/routes/Route'

export interface DocRoute<C = any> extends Route<C> {
    doc: string
}

export interface DocData {
    id: string
}

export interface DocsContextType {
    loader: (file: string, doc: any) => Promise<any>
}

// @ts-ignore
const DocsContext = React.createContext<DocsContextType>({})

export const useDocs = (): DocsContextType => React.useContext(DocsContext)

export const DocsProvider: React.ComponentType<React.PropsWithChildren<{
    loader: DocsContextType['loader']
}>> = ({children, loader}) => {
    const ctx = React.useMemo(() => ({loader}), [loader])
    return <DocsContext.Provider value={ctx}>
        {children}
    </DocsContext.Provider>
}
