import React from 'react'

export interface SearchProviderContext {
    open: boolean
    setOpen: (open: boolean | ((currentOpen: boolean) => boolean)) => void
}

export interface SearchIndexContextType {
    index: any
}

export interface SearchProviderProps {
    indexUrl: string
}

const SearchContext = React.createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, o => o])
const SearchContextHistory = React.createContext<[string[], React.Dispatch<React.SetStateAction<string[]>>]>([[], o => o])
const SearchIndexContext = React.createContext<SearchIndexContextType>({index: undefined})

export const useSearch = (): SearchProviderContext => {
    const [open, setOpen] = React.useContext(SearchContext)
    return {open, setOpen}
}

export const useSearchIndex = (): SearchIndexContextType => React.useContext<SearchIndexContextType>(SearchIndexContext)
export const useSearchHistory = (): {
    history: string[]
    addTerm: (term: string) => void
    clearHistory: () => void
} => {
    const [history, setter] = React.useContext<[string[], React.Dispatch<React.SetStateAction<string[]>>]>(SearchContextHistory)
    const addTerm = React.useCallback((term: string) => {
        setter((history) => {
            history = [...history]
            const i = history.indexOf(term)
            if(i !== -1) {
                history.splice(i, 1)
            }
            history.push(term)
            window.localStorage.setItem('uis-search-history', JSON.stringify(history))
            return history
        })
    }, [setter])

    const clearHistory = React.useCallback(() => {
        window.localStorage.setItem('uis-search-history', JSON.stringify([]))
        setter(() => [])
    }, [setter])

    return {
        history, addTerm,
        clearHistory,
    }
}

export const SearchProvider = ({children, indexUrl}: React.PropsWithChildren<SearchProviderProps>): React.ReactElement => {
    const contextOpenState = React.useState(() => false)
    const contextHistoryState = React.useState<string[]>(() => [])
    const [contextIndexState, setContextIndexState] = React.useState<SearchIndexContextType>({index: undefined})

    const open = contextOpenState[0]
    const setOpen = contextOpenState[1]
    const setter = contextHistoryState[1]

    React.useEffect(() => {
        if(!open) return
        try {
            const item = window.localStorage.getItem('uis-search-history')
            if(!item) return
            setter(JSON.parse(item))
        } catch(e) {
            // noop
        }
    }, [open, setter])

    React.useEffect(() => {
        fetch(indexUrl)
            .then(r => r.status === 200 ? r.json() : Promise.reject(r))
            .then(r => setContextIndexState(i => ({...i, index: r})))
            .catch(e => console.error('error loading search index', indexUrl, e))
        const onKey = (e: KeyboardEvent) => {
            if(e.ctrlKey && (e.key === 'k' || e.key === 'K')) {
                e.preventDefault()
                setOpen(true)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [indexUrl, setOpen, setContextIndexState])

    return <SearchContext.Provider value={contextOpenState}>
        <SearchContextHistory.Provider value={contextHistoryState}>
            <SearchIndexContext.Provider value={contextIndexState}>
                {children}
            </SearchIndexContext.Provider>
        </SearchContextHistory.Provider>
    </SearchContext.Provider>
}
