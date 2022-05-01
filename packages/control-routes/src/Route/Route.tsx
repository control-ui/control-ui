export interface RouteComponent<C> {
    exact?: boolean
    component: C
}

export interface RouteNav {
    to: string
    toSection?: string | RegExp
    label: string
    divider?: boolean
    initialOpen?: boolean
    icon?: any
    changeFreq?: string
}

export interface Route<C = any> {
    'path'?: string
    nav?: RouteNav
    routes?: Route<C>[]
    config?: { [k: string]: RouteComponent<C> }
}
