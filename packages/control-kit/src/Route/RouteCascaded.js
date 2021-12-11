import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {useRouter} from "@control-ui/app/RouterProvider";

/**
 * Provide endless cascading routing over configs and 1. with automatic subrendering, 2. with subrendering over passing subroutes to rendered component
 * @todo: reducer like `childProps` using `route`
 * @todo: add option to really `nest`/`cascade` the routes, so nested routes are not changing their parent route, (mb: like at orbiter-publish)
 */
const RouteCascaded = ({routeId, path, routes, childProps, component: Comp, render, ...props}) => {
    return <>
        {Comp || render ? <Route
            path={path}
            {...props}
            render={render ? render :
                (props) =>
                    <Comp {...props} {...childProps}/>}
        /> : null}

        {routes ?
            // when there is a defined component name, add further cascading routing into render prop
            routes.map((route, i) => {
                const routeConfig = route[routeId] || {};
                return <RouteCascaded
                    key={i}
                    path={route.path}
                    routeId={routeId}
                    childProps={{childProps}}
                    {...routeConfig}
                />
            })
            : null}
    </>;
};

export const Routes = ({routeId, childProps, Fallback}) => {
    const {routes} = useRouter();
    return <Switch>
        {/* need to pass the exact same props to the first level of switch, RouteCascaded must be compatible with `Route` */}
        {routes.routes.map((route, i) => {
            const routeConfig = route[routeId] || {};
            return <RouteCascaded
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
                <Fallback {...props} {...childProps}/>
            )}
        /> : null}
    </Switch>
};

export default RouteCascaded;
