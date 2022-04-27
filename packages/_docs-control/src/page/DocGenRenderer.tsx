import React from 'react'
import { FunctionProp, PropKind, hasValue, isIndexProp, isTupleProp, isUnionProp, PropType } from '@structured-types/api'
import { DocGenParamsTable } from './DocGenParamsTable'

export const DocGenRendererGenerics: React.ComponentType<{
    generics: PropType[]
}> = ({generics}) => {
    return <span>
        &lt;
        {generics.map((generic, i) =>
            // todo: add support for generics extends/default values
            <span key={i}>
                {generic.name}
                {generic.name && (generic.type || generic.kind) ? ' = ' : ''}
                {generic.type ?
                    generic.type :
                    isUnionProp(generic) ?
                        generic.properties?.map(p => p.name || (hasValue(p) && p.value ? JSON.stringify(p.value) : p.type))
                            .join(' | ') :
                        generic.kind ?
                            PropKind[generic.kind] :
                            null}
                {i < (generics.length - 1) ? ', ' : ''}
            </span>)}
        &gt;
    </span>
}

export const DocGenRendererFn: React.ComponentType<{
    prop: FunctionProp
}> = ({prop}) => {
    const {parameters} = prop
    return <span>
        {'('}
        {parameters?.map((param, i) =>
            <span key={i}>
                {param.name}
                {param.optional ? '?' : ''}
                {param.type || param.kind ? ': ' : ''}
                {
                    param.type ? param.type :
                        isUnionProp(param) && param.properties ?
                            <DocGenRendererUnion props={param.properties as PropType[]}/> :
                            param.kind ? PropKind[param.kind] : ''
                }
                {// @ts-ignore
                    param.generics ? <DocGenRendererGenerics generics={param.generics}/> : null}
                {i < parameters.length - 1 ? ', ' : null}
            </span>,
        )}
        {') => '}
        {prop.returns ? <>
            {
                prop.returns.name || prop.returns.type ?
                    <DocGenRendererNameOrTypedValue prop={prop.returns} parent={prop}/> :
                    typeof prop.returns.kind === 'undefined' ? null : ' ' + PropKind[prop.returns.kind] + ''
            }
        </> : 'Void'}
    </span>
}

export const DocGenRendererNameOrTypedValue: React.ComponentType<{
    prop: PropType
    parent: PropType
}> = ({prop, parent}) => {
    const valueDriven = isTupleProp(parent) || isUnionProp(parent)
    return <>
        {valueDriven && hasValue(prop) && typeof prop.value !== 'undefined' ?
            <>
                {typeof prop.value === 'string' || typeof prop.value === 'number' ?
                    prop.value : JSON.stringify(prop.value)}
            </> :
            isIndexProp(prop) && prop.index ?
                <>
                    [{prop.index.name}: {prop.index.kind ? PropKind[prop.index.kind] : null}]:&nbsp;

                    {!prop.prop?.type && (prop.prop?.kind === 14 || prop.prop?.kind === 15) ?
                        // for indexes which are nested types/interfaces and got not name, render nested tables
                        // todo: beautify table stuff
                        // @ts-ignore
                        <DocGenParamsTable module={prop.prop} mt={0} mb={0} definerList={prop.prop.properties}/> :
                        prop.prop?.type ?
                            <span>
                                {prop.prop?.type}
                                {// @ts-ignore
                                    prop.prop.generics ? <DocGenRendererGenerics generics={prop.prop.generics}/> : null}
                            </span> : null}
                </> :
                <>
                    {prop.name || prop.type}
                    {hasValue(prop) && typeof prop.value !== 'undefined' ?
                        <span>
                            {' = '}
                            {JSON.stringify(prop.value)}
                        </span> :
                        null}
                </>}
    </>
}

export const DocGenRendererUnion: React.ComponentType<{ props: PropType[] }> = ({props}) => {
    return props.map((p, i) =>
        <span key={i}>
            {p.type ?
                <>
                    {p.type}
                    {// @ts-ignore
                        p.generics ? <DocGenRendererGenerics generics={p.generics}/> : null}
                </>
                : (
                    // @ts-ignore
                    typeof p.value !== 'undefined' ? JSON.stringify(p.value) : (p.kind ? PropKind[p.kind] : '-')
                )}
            {i < ((props.length || 0) - 1) ? ' | ' : ''}
        </span>) as unknown as React.ReactElement
}
