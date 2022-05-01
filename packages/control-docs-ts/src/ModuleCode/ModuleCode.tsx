import React from 'react'
import { FunctionProp, PropKind, hasValue, isIndexProp, isTupleProp, isUnionProp, PropType, hasGenerics, hasProperties } from '@structured-types/api'
import { ModuleParams } from '@control-ui/docs-ts/ModuleParams'
import { TsDocsModuleRenderer } from '@control-ui/docs-ts/TsDocs'

export const ModuleCodeGenerics: React.ComponentType<{
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

export const ModuleCodeFn: React.ComponentType<{
    prop: FunctionProp
    renderer: TsDocsModuleRenderer
}> = ({prop, renderer}) => {
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
                            <ModuleCodeUnion props={param.properties as PropType[]}/> :
                            param.kind ? PropKind[param.kind] : ''
                }
                {// @ts-ignore
                    param.generics ? <ModuleCodeGenerics generics={param.generics}/> : null}
                {i < parameters.length - 1 ? ', ' : null}
            </span>,
        )}
        {') => '}
        {prop.returns ? <>
            {
                prop.returns.name || prop.returns.type ?
                    <ModuleCodeNameOrTypedValue prop={prop.returns} parent={prop} renderer={renderer}/> :
                    typeof prop.returns.kind === 'undefined' ? null : ' ' + PropKind[prop.returns.kind] + ''
            }
        </> : 'Void'}
    </span>
}

export interface ModuleCodeNameOrTypedValueProps {
    prop: PropType
    parent: PropType
    renderer: TsDocsModuleRenderer
}

export const ModuleCodeNameOrTypedValue: React.ComponentType<ModuleCodeNameOrTypedValueProps> = ({prop, parent, renderer}) => {
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

                    {!prop.prop?.type && prop.prop && hasProperties(prop.prop) && prop.prop.properties ?
                        // for indexes which are nested types/interfaces and got not name, render nested tables
                        // todo: beautify table stuff
                        <ModuleParams parent={prop.prop} mt={0} mb={0} params={prop.prop.properties} renderer={renderer}/> :
                        prop.prop?.type ?
                            <span>
                                {prop.prop?.type}
                                {hasGenerics(prop.prop) && prop.prop.generics ?
                                    <ModuleCodeGenerics generics={prop.prop.generics}/> : null}
                            </span> : null}
                </> :
                hasProperties(prop) && !prop?.name && !prop?.type && prop.properties ?
                    // for indexes which are nested types/interfaces and got not name, render nested tables
                    // todo: beautify table stuff
                    <ModuleParams parent={prop} mt={0} mb={0} params={prop.properties} renderer={renderer}/> :
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

export interface ModuleCodeUnionProps {
    props: PropType[]
}

export const ModuleCodeUnion: React.FC<ModuleCodeUnionProps> = ({props}) => {
    return props.map((p, i) =>
        <span key={i}>
            {p.type ?
                <>
                    {p.type}
                    {hasGenerics(p) && p.generics ? <ModuleCodeGenerics generics={p.generics}/> : null}
                </> : (
                    hasValue(p) && typeof p.value !== 'undefined' ?
                        JSON.stringify(p.value) : (
                            p.kind ?
                                PropKind[p.kind] :
                                '-'
                        )
                )}
            {i < ((props.length || 0) - 1) ? ' | ' : ''}
        </span>) as unknown as React.ReactElement
}

export const ModuleCodeReturns: React.ComponentType<{
    returns: PropType
    parent: PropType
    renderer: TsDocsModuleRenderer
}> = ({returns, parent, renderer}) => {
    const {InlineCode} = renderer
    return <>
        {returns.name || returns.type ?
            <InlineCode>
                <ModuleCodeNameOrTypedValue prop={returns} parent={parent} renderer={renderer}/>
                {hasGenerics(returns) && returns?.generics ? <ModuleCodeGenerics generics={returns.generics}/> : null}
            </InlineCode> : null}
        {typeof returns.kind === 'undefined' ||
        returns.kind === PropKind.Unknown ||
        returns.kind === PropKind.Type ?
            null : ' ' + PropKind[returns.kind] + ''}
    </>
}
