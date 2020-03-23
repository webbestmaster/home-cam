// @flow

import React, {type Node} from 'react';
import {Switch} from 'react-router-dom';

import {ThemeProvider} from '../../provider/theme/c-theme-context';
import {LocaleProvider} from '../../provider/locale/c-locale-context';
import {SystemProvider} from '../../provider/system/c-system-context';
import {UserProvider} from '../../provider/user/c-user-context';
import {MainWrapper} from '../main-wrapper/c-main-wrapper';

import {routeItemMap, routeItemPage404} from './routes';
import {redderRoute} from './render-route/render-route';
import {renderWrapperList} from './wrapper-list';

const wrapperList = [ThemeProvider, LocaleProvider, SystemProvider, UserProvider, MainWrapper];

export function ClientApp(): Node {
    const routeItemKeyList = Object.keys(routeItemMap);
    const routeList = routeItemKeyList.map((key: string): Node => redderRoute(routeItemMap[key]));

    return renderWrapperList(wrapperList, [
        <Switch key="switch">
            {routeList}
            {redderRoute(routeItemPage404)}
        </Switch>,
    ]);
}
