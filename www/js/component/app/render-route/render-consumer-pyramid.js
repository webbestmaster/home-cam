// @flow

/* eslint-disable max-len */

import React, {type Node} from 'react';

import type {ContextRouterType} from '../../../type/react-router-dom-v5-type-extract';
import {ThemeContextConsumer} from '../../../provider/theme/c-theme-context';
import type {ThemeContextType} from '../../../provider/theme/theme-context-type';
import {UserContextConsumer} from '../../../provider/user/c-user-context';
import type {UserContextType} from '../../../provider/user/user-context-type';
import {SystemContextConsumer} from '../../../provider/system/c-system-context';
import type {SystemContextType} from '../../../provider/system/system-context-type';

import type {RenderPageInputDataType, RouteItemType} from './render-route-type';
import {renderPage} from './render-route-page';

export function renderConsumerPyramid(routeItem: RouteItemType, contextRouterData: ContextRouterType): Node {
    const {match, history, location, staticContext} = contextRouterData;

    return (
        <SystemContextConsumer>
            {(systemContextData: SystemContextType): Node => {
                return (
                    <ThemeContextConsumer>
                        {(themeContextData: ThemeContextType): Node => {
                            return (
                                <UserContextConsumer>
                                    {(userContextData: UserContextType): Node => {
                                        const pageInputData: RenderPageInputDataType = {
                                            location,
                                            history,
                                            match,
                                            userContextData,
                                            themeContextData,
                                            staticContext,
                                            systemContextData,
                                        };

                                        return renderPage(pageInputData, routeItem);
                                    }}
                                </UserContextConsumer>
                            );
                        }}
                    </ThemeContextConsumer>
                );
            }}
        </SystemContextConsumer>
    );
}
