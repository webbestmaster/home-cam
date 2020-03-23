// @flow

/* global window, requestAnimationFrame, sessionStorage */

import React, {Component, type Node} from 'react';
import classNames from 'classnames';

import type {LocationType} from '../../../type/react-router-dom-v5-type-extract';
import type {PromiseResolveType} from '../../../lib/promise';
import {debounce} from '../../../lib/function';

import scrollRestorationStyle from './scroll-restoration.scss';

const topScrollPositionToShowToTopButton = 100;

type PropsType = {
    +location: LocationType,
};

type StateType = {|
    +isToTopButtonVisible: boolean,
|};

const storageKeyPrefix = 'scroll-restoration-path:';

export class ScrollRestoration extends Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        this.state = {
            isToTopButtonVisible: false,
        };
    }

    componentDidMount() {
        const {props} = this;
        const {location} = props;
        const {pathname} = location;

        this.restoreScrollTopPosition(pathname);

        window.addEventListener('scroll', debounce<() => void>(this.handleChangeScrollTopPosition, 150), {
            capture: false,
            passive: true,
        });

        console.log('---> ScrollRestoration did MOUNT');
    }

    componentDidUpdate(prevProps: PropsType) {
        const {props} = this;
        const {location} = props;
        const {pathname} = location;

        if (prevProps.location.pathname !== pathname) {
            this.restoreScrollTopPosition(pathname);
        }
    }

    refreshIsToTopButtonVisible() {
        const {scrollTop} = window.document.documentElement;
        const isToTopButtonVisible = scrollTop > topScrollPositionToShowToTopButton;

        this.setState({isToTopButtonVisible});
    }

    handleChangeScrollTopPosition = () => {
        this.refreshIsToTopButtonVisible();
        this.saveScrollTopPosition();
    };

    saveScrollTopPosition = () => {
        const {props} = this;
        const {location} = props;
        const {pathname} = location;
        const {scrollTop} = window.document.documentElement;

        sessionStorage.setItem(storageKeyPrefix + pathname, String(scrollTop));
    };

    restoreScrollTopPosition(pathname: string): Promise<void> {
        const scrollTop = parseInt(sessionStorage.getItem(storageKeyPrefix + pathname), 10) || 0;
        const {documentElement} = window.document;

        return new Promise((resolve: PromiseResolveType<void>) => {
            requestAnimationFrame(() => {
                documentElement.scrollTop = scrollTop;

                requestAnimationFrame(() => {
                    documentElement.scrollTop = scrollTop;

                    this.refreshIsToTopButtonVisible();

                    resolve();
                });
            });
        });
    }

    handleScrollToTop = () => {
        window.document.documentElement.scrollTop = 0;

        this.handleChangeScrollTopPosition();
    };

    render(): Node {
        const {state} = this;
        const {isToTopButtonVisible} = state;

        return (
            <button
                aria-label="Наверх"
                className={classNames(scrollRestorationStyle.scroll_restoration__scroll_to_top_button, {
                    [scrollRestorationStyle.scroll_restoration__scroll_to_top_button__visible]: isToTopButtonVisible,
                })}
                onClick={this.handleScrollToTop}
                type="button"
            >
                <span className={scrollRestorationStyle.scroll_restoration__scroll_to_top_button__arrow}/>
            </button>
        );
    }
}
