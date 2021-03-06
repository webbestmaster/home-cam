// @flow

import React, {Component, type Node} from 'react';

import {startStreaming} from './home-helper';
// import {Link} from 'react-router-dom';

// import type {InitialDataType} from '../../provider/intial-data/intial-data-type';
// import type {MongoDocumentType} from '../../../../../server/src/database/database-type';
// import type {LocationType, MatchType} from '../../type/react-router-dom-v5-type-extract';
// import serviceStyle from '../../../css/service.scss';
// import {Markdown} from '../../component/layout/markdown/c-markdown';
// import type {SystemContextType} from '../../provider/system/system-context-type';
// import {getResizedImageSrc} from '../../lib/url';
// import {getLinkToReadArticle} from '../../lib/string';
// import {PageLoading} from '../../component/client/page-loading/c-page-loading';
// import {ErrorConnectionContent} from '../article/error-connection-content/c-error-connection-content';
// import articleStyle from '../article/article.scss';
// import {ShareButtonList} from '../../component/share/share-button-list/c-share-button-list';

// import homeStyle from './home.scss';

type PropsType = {
    // +location: LocationType,
    // +initialContextData: InitialDataType,
    // +systemContextData: SystemContextType,
    // +match: MatchType | null,
};

type StateType = null;

export class Home extends Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        this.ref = {
            video: React.createRef<HTMLVideoElement>(),
        };
    }

    componentDidMount() {
        startStreaming(this.ref.video.current);
    }

    ref: {|
        +video: {|
            current: HTMLVideoElement | null,
        |},
    |};

    update(data) {
        console.log(data)
    }

    render(): Node {
        const {ref} = this;

        return (
            <div>
                {/*<input type="file" accept="image/*;capture=camera"/>*/}
                {/*<device type="media" onChange={this.update}/>*/}
                <video controls ref={ref.video}/>
                <h1>home</h1>
            </div>
        );
    }
}
