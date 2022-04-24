import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useRouter } from '@control-ui/app/RouterProvider'
import { RouteComponentProps } from 'react-router'

/**
 * Provide endless cascading routing over configs and 1. with automatic subrendering, 2. with subrendering over passing subroutes to rendered component
 * @todo: reducer like `childProps` using `route`
 * @todo: add option to really `nest`/`cascade` the routes, so nested routes are not changing their parent route, (mb: like at orbiter-publish)
 */
// @ts-ignore
export const RouteCascadeNested = ({routeId, path, routes, childProps, component: Comp, render, ...props}) => {
    return <>
        {Comp || render ? <Route
            path={path}
            {...props}
            render={render ? render :
                // @ts-ignore
                (props) =>
                    <Comp {...props} {...childProps}/>}
        /> : null}

        {routes ?
            // when there is a defined component name, add further cascading routing into render prop
            // @ts-ignore
            routes.map((route, i) => {
                const routeConfig = route?.config?.[routeId] || {}
                return <RouteCascadeNested
                    key={i}
                    path={route.path}
                    routeId={routeId}
                    childProps={{childProps}}
                    {...routeConfig}
                />
            })
            : null}
    </>
}

export const RouteCascade = <CP, >(
    {routeId, childProps, Fallback}: {
        routeId: string
        childProps: CP
        Fallback?: React.ComponentType<RouteComponentProps<CP>>
    },
) => {
    const {routes} = useRouter()
    return <Switch>
        {/* need to pass the exact same props to the first level of switch, RouteCascaded must be compatible with `Route` */}
        {routes?.routes?.map((route, i) => {
            const routeConfig = route?.config?.[routeId] || {}
            // @ts-ignore
            return <RouteCascadeNested
                key={i}
                path={route.path}
                routeId={routeId}
                childProps={childProps}
                {...routeConfig}
            />
        })}

        {Fallback ? <Route
            render={props => (
                // pass the sub-routes down to keep nesting
                // @ts-ignore
                <Fallback {...props} {...childProps}/>
            )}
        /> : null}
    </Switch>
}
