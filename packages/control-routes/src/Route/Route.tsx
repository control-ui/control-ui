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

export interface Route<C = any, N extends RouteNav = RouteNav> {
    'path'?: string
    nav?: N
    // todo: somehow `routes` need to be overridable with the Route itself
    routes?: Route<C, N>[]
    config?: { [k: string]: RouteComponent<C> }
}

export interface RouteNested<R extends Route = Route> {
    routes?: R[]
}
