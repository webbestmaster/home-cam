// @flow

import React, {type Node} from 'react';

import type {LocationType} from '../../type/react-router-dom-v5-type-extract';
import type {SystemContextType} from '../../provider/system/system-context-type';

import pageWrapperStyle from './page-wrapper.scss';

type PropsType = {|
    +children: Node,
    +location: LocationType,
    +systemContextData: SystemContextType,
|};

export type PageWrapperPropsType = PropsType;

export function PageWrapper(props: PropsType): Array<Node> {
    const {children, location, systemContextData} = props;

    return [
        // <CMSHeaderWrapper key="cms-header-wrapper" location={location}/>,
        <main className={pageWrapperStyle.main_content} key="main">
            {children}
        </main>,

        /*
        <BottomAdsWrapper
            initialContextData={initialContextData}
            key="bottom-ad-wrapper"
            systemContextData={systemContextData}
        />,
        <Footer key="footer" location={location}/>,
*/
    ];
}
