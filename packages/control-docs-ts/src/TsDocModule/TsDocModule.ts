import { PropType } from '@structured-types/api'

export interface TsDocModuleCollection {
    package: string
    fromPath: string
    relPath: string
    files: string[]
    docs: { [k: string]: TsDocModuleDefinition }
}

/**
 * @see [structured-types PropType](https://github.com/ccontrols/structured-types/blob/master/packages/api/README.md#proptype)
 * @internal only for internal usage
 */
export interface TsDocModuleDefinition extends PropType {
    name: string
    description?: string
    extension?: 'react'
    // todo: where are custom TSDoc comments available? e.g. `internal`/`@internal` doesn't do anything
    internal?: boolean
    // kind: number
    // deprecated?: boolean
    generics?: PropType[]
    types?: PropType[]
    properties?: PropType[]
    parameters?: PropType[]
    returns?: PropType
}
