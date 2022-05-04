import React from 'react'
import { DocsIndexValues } from '@control-ui/docs/createDocsIndex'

export interface SearchProviderContext {
    open: boolean
    setOpen: (open: boolean | ((currentOpen: boolean) => boolean)) => void
}

export interface SearchIndexContextType<I extends DocsIndexValues = DocsIndexValues> {
    index: I | undefined
}

const SearchContext = React.createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, o => o])
const SearchContextHistory = React.createContext<[string[], React.Dispatch<React.SetStateAction<string[]>>, SearchHistoryOptions]>([
    [],
    o => o,
    // @ts-ignore
    {},
])

export const useSearch = (): SearchProviderContext => {
    const [open, setOpen] = React.useContext(SearchContext)
    return {open, setOpen}
}

export const useSearchHistory = (): {
    history: string[]
    addTerm: (term: string) => void
    clearHistory: () => void
    localKey: string
    bindKey?: string
} => {
    const [history, setter, {localKey, bindKey}] = React.useContext<[string[], React.Dispatch<React.SetStateAction<string[]>>, SearchHistoryOptions]>(SearchContextHistory)
    const addTerm = React.useCallback((term: string) => {
        setter((history) => {
            history = [...history]
            const i = history.indexOf(term)
            if(i !== -1) {
                history.splice(i, 1)
            }
            history.push(term)
            window.localStorage.setItem(localKey, JSON.stringify(history))
            return history
        })
    }, [setter, localKey])

    const clearHistory = React.useCallback(() => {
        window.localStorage.setItem(localKey, JSON.stringify([]))
        setter(() => [])
    }, [setter, localKey])

    return {
        history, addTerm,
        clearHistory,
        localKey, bindKey,
    }
}

export interface SearchHistoryOptions {
    localKey: string
    bindKey?: string
}

export type DocsSearchProviderProps = SearchHistoryOptions

export const DocsSearchProvider = (
    {
        children, bindKey,
        localKey,
    }: React.PropsWithChildren<DocsSearchProviderProps>,
): React.ReactElement => {
    const contextOpenState = React.useState(() => false)
    const [history, setHistory] = React.useState<string[]>(() => [])

    const open = contextOpenState[0]
    const setOpen = contextOpenState[1]

    React.useEffect(() => {
        if(!open) return
        try {
            const item = window.localStorage.getItem(localKey)
            if(!item) return
            setHistory(JSON.parse(item))
        } catch(e) {
            // noop
        }
    }, [open, setHistory, localKey])

    React.useEffect(() => {
        if(typeof bindKey === 'undefined') return
        const onKey = (e: KeyboardEvent) => {
            if((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === bindKey.toLowerCase()) {
                e.preventDefault()
                setOpen(true)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [setOpen, bindKey])

    const ctx = React.useMemo(
        () =>
            [history, setHistory, {localKey, bindKey}] as [string[], React.Dispatch<React.SetStateAction<string[]>>, SearchHistoryOptions],
        [history, setHistory, localKey, bindKey],
    )

    return <SearchContext.Provider value={contextOpenState}>
        <SearchContextHistory.Provider value={ctx}>
            {children}
        </SearchContextHistory.Provider>
    </SearchContext.Provider>
}
