// @flow

import React, {type Node} from 'react';

import type {LocaleContextType} from '../../provider/locale/locale-context-type';
import {LocaleContextConsumer} from '../../provider/locale/c-locale-context';
import type {SystemContextType} from '../../provider/system/system-context-type';
import {SystemContextConsumer} from '../../provider/system/c-system-context';
import {ThemeContextConsumer} from '../../provider/theme/c-theme-context';
import type {ThemeContextType} from '../../provider/theme/theme-context-type';

import {getMainWrapperClassName} from './main-wrapper-helper';

type PropsType = {|
    +children: Node,
|};

export function MainWrapper(props: PropsType): Node {
    const {children} = props;

    return (
        <ThemeContextConsumer>
            {(themeContextData: ThemeContextType): Node => {
                return (
                    <LocaleContextConsumer>
                        {(localeContextData: LocaleContextType): Node => {
                            return (
                                <SystemContextConsumer>
                                    {(systemContextData: SystemContextType): Node => {
                                        const className = getMainWrapperClassName(
                                            themeContextData,
                                            localeContextData,
                                            systemContextData
                                        );

                                        return <div className={className}>{children}</div>;
                                    }}
                                </SystemContextConsumer>
                            );
                        }}
                    </LocaleContextConsumer>
                );
            }}
        </ThemeContextConsumer>
    );
}
