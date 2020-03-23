// @flow

/* global window */

// import {userApiRouteMap} from '../../../../server/src/api/api-route-map';
import {promiseCatch} from '../../lib/promise';
import type {MainServerApiResponseType} from '../../type/response';

import type {MongoUserFrontType} from './user-context-type';

export const userApiRouteMap = {
    getUserList: '/api/get-user-list',
    getUserListSize: '/api/get-user-list-size',
    register: '/api/register',
    login: '/api/login',
    unLogin: '/api/un-login',
    getCurrentUser: '/api/get-current-user',
};

export function getCurrentUser(): Promise<MongoUserFrontType | Error> {
    return window
        .fetch(userApiRouteMap.getCurrentUser)
        .then((response: Response): Promise<MongoUserFrontType> => response.json())
        .catch(promiseCatch);
}

export function login(userLogin: string, userPassword: string): Promise<MongoUserFrontType | Error> {
    return window
        .fetch(userApiRouteMap.login, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login: userLogin, password: userPassword}),
        })
        .then((response: Response): Promise<MongoUserFrontType | MainServerApiResponseType> => response.json())
        .catch(promiseCatch);
}

export function register(userLogin: string, userPassword: string): Promise<MainServerApiResponseType | Error> {
    return window
        .fetch(userApiRouteMap.register, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({login: userLogin, password: userPassword}),
        })
        .then((response: Response): Promise<MainServerApiResponseType> => response.json())
        .catch(promiseCatch);
}

export function unLogin(): Promise<MainServerApiResponseType | Error> {
    return window
        .fetch(userApiRouteMap.unLogin)
        .then((response: Response): Promise<MainServerApiResponseType> => response.json())
        .catch(promiseCatch);
}
