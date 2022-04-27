import { PropType } from '@structured-types/api'

export interface DocModule {
    package: string
    fromPath: string
    relPath: string
    files: string[]
    docs: { [k: string]: DocModuleExport }
}

// eslint-disable-next-line
export interface DocModuleExportProp extends PropType {
    /*name: string
    kind?: number
    type?: string
    value?: any
    description?: string
    optional?: boolean
    index?: {
        name: string
        kind: number
    }
    prop?: {
        kind: number
        type: string
        description?: string
    }*/
}

export interface DocModuleExportParam {
    name?: string
    kind: number
    type?: string
    description?: string
    optional?: boolean
}

export interface DocModuleExport extends PropType {
    // https://github.com/ccontrols/structured-types/blob/master/packages/api/README.md#proptype
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
