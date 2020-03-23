// @flow

import classNames from 'classnames';

import type {ThemeContextType} from '../../provider/theme/theme-context-type';
import type {LocaleContextType} from '../../provider/locale/locale-context-type';
import type {SystemContextType} from '../../provider/system/system-context-type';

import {themeNameMap} from '../../provider/theme/theme-context-const';
import {localeNameReference} from '../../provider/locale/locale-context-const';
import {screenNameReference} from '../../provider/system/system-context-const';

import mainWrapperStyle from './main-wrapper.scss';
import {mainWrapperClassName} from './main-wrapper-const';

// eslint-disable-next-line complexity
export function getMainWrapperClassName(
    themeContextData: ThemeContextType,
    localeContextData: LocaleContextType,
    systemContextData: SystemContextType
): string {
    const {isScriptLoaded, isWindowLoaded} = systemContextData;

    const mainClassMap = {
        [mainWrapperStyle.main_wrapper]: true,
        [mainWrapperClassName.themeDefault]: themeContextData.name === themeNameMap.default,
        [mainWrapperClassName.themeDark]: themeContextData.name === themeNameMap.dark,
        [mainWrapperClassName.landscape]: systemContextData.screen.isLandscape,
        [mainWrapperClassName.portrait]: systemContextData.screen.isPortrait,
        [mainWrapperClassName.scriptLoaded]: isScriptLoaded,
        [mainWrapperClassName.windowLoaded]: isWindowLoaded,
        [mainWrapperClassName.localeEnUs]: localeContextData.name === localeNameReference.enUs,
        [mainWrapperClassName.localeRuRu]: localeContextData.name === localeNameReference.ruRu,
        [mainWrapperClassName.localeZhCh]: localeContextData.name === localeNameReference.zhCn,
        [mainWrapperClassName.localeZhTw]: localeContextData.name === localeNameReference.zhTw,
    };

    const deviceBrowserClassMap = {
        [mainWrapperClassName.mobile]: systemContextData.screen.isMobile,
        [mainWrapperClassName.tablet]: systemContextData.screen.isTablet,
        [mainWrapperClassName.desktop]: systemContextData.screen.isDesktop,
        [mainWrapperClassName.ltTabletWidth]: systemContextData.screen.littleThenList.includes(
            screenNameReference.tablet
        ),
        [mainWrapperClassName.ltDesktopWidth]: systemContextData.screen.littleThenList.includes(
            screenNameReference.desktop
        ),
    };

    if (isScriptLoaded) {
        return classNames({...mainClassMap, ...deviceBrowserClassMap});
    }

    return classNames({
        ...mainClassMap,
        [mainWrapperClassName.mobile]: false,
        [mainWrapperClassName.tablet]: false,
        [mainWrapperClassName.desktop]: false,
        [mainWrapperClassName.ltTabletWidth]: false,
        [mainWrapperClassName.ltDesktopWidth]: false,
    });
}
