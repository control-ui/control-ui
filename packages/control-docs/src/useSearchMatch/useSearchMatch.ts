import { DocsIndexValues } from '@control-ui/docs/createDocsIndex'
import React from 'react'

export type SearchFn<O = unknown> = (term: string, options?: O) => any[]
export type MatcherInstance<O = unknown> = { search: SearchFn<O> }
export type MatchMakerType<K, O = unknown> = {
    [S in keyof K]: {
        factory: (d: K[S]) => MatcherInstance<O>
    }
}
export const useSearchMatching = <I extends DocsIndexValues = DocsIndexValues>(
    index: I,
    matchMaker: MatchMakerType<I>,
): {
    matcher: MatcherInstance
    id: string
}[] => {
    const matchMakerInstancesRef = React.useRef<{
        [k: string]: {
            index?: any
            instance?: any
        }
    }>({})

    return React.useMemo(() => {
        const matchMakerInstances = matchMakerInstancesRef.current
        Object.keys(index).forEach((id) => {
            if(!matchMakerInstances[id]) {
                matchMakerInstances[id] = {}
            }
            if(matchMakerInstances[id]?.index !== index[id]) {
                matchMakerInstances[id].index = index[id]
                matchMakerInstances[id].instance = matchMaker[id].factory(index[id])
            }
        })
        return Object.keys(matchMakerInstances).reduce((matchers, id) => {
            matchers.push({
                matcher: matchMakerInstances[id].instance,
                id,
            })
            return matchers
        }, [] as {
            matcher: MatcherInstance
            id: string
        }[])
    }, [index, matchMaker])
}
