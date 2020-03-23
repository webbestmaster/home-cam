// @flow

/* eslint react/no-multi-comp: 0 */

import React, {type Node} from 'react';
import {Link, Redirect, Route} from 'react-router-dom';

import type {RedirectItemType, RenderPageInputDataType, RouteItemType} from './render-route-type';

export function isRoute(routeItem: RouteItemType | RedirectItemType): boolean %checks {
    return routeItem.type === 'route';
}

export function isRedirect(routeItem: RouteItemType | RedirectItemType): boolean %checks {
    return routeItem.type === 'redirect';
}

export function redderEmptyRoute(routeItem: RouteItemType | RedirectItemType): Node {
    const {path} = routeItem;

    if (isRedirect(routeItem)) {
        return <Redirect from={routeItem.from} key={routeItem.from + path} to={path}/>;
    }

    return <Route exact key={path} path={path}/>;
}

export function redderLink(routeItem: RouteItemType): Node {
    const {path} = routeItem;

    return (
        <Link key={path} to={path}>
            {path}
        </Link>
    );
}

export function renderPageComponent(pageInputData: RenderPageInputDataType, routeItem: RouteItemType): Node {
    const {
        location,
        history,
        match,
        userContextData,
        staticContext,
        themeContextData,
        systemContextData,
    } = pageInputData;

    const {component: PageComponent} = routeItem;

    return (
        <PageComponent
            history={history}
            location={location}
            match={match}
            staticContext={staticContext}
            systemContextData={systemContextData}
            themeContextData={themeContextData}
            userContextData={userContextData}
        />
    );
}
