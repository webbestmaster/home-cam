// @flow

/* global location */

import React, {Component, type Node} from 'react';

type PropsType = {};

type StateType = null;

// eslint-disable-next-line react/prefer-stateless-function
export class PageNotFound extends Component<PropsType, StateType> {
    render(): Node {
        return <h1>page not found</h1>;
    }
}
