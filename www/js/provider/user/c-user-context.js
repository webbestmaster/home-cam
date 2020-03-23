// @flow

import React, {Component, type Node} from 'react';

import {isError} from '../../lib/is';
import type {MainServerApiResponseType} from '../../type/response';

import type {MongoUserFrontType, UserContextType} from './user-context-type.js';

import {getCurrentUser, login, register} from './user-context-api';
import {defaultUserContextData} from './user-context-const';

const userContext = React.createContext<UserContextType>(defaultUserContextData);
const UserContextProvider = userContext.Provider;

export const UserContextConsumer = userContext.Consumer;

type PropsType = {|
    +children: Node,
|};

type StateType = {|
    +providedData: UserContextType,
|};

export class UserProvider extends Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        this.state = {
            providedData: defaultUserContextData,
        };
    }

    async componentDidMount() {
        // this.fetchCurrentUser();
    }

    async fetchCurrentUser() {
        const user = await getCurrentUser();
        const {state} = this;
        const {providedData} = state;

        if (isError(user)) {
            console.error('Can not get user');
            return;
        }

        if (user.login === '') {
            console.log('===> You are not login.');
            return;
        }

        this.setState({providedData: {...providedData, user}});
    }

    login = async (userLogin: string, userPassword: string): Promise<MongoUserFrontType | Error> => {
        const {state} = this;
        const {providedData} = state;
        const loginResult = await login(userLogin, userPassword);

        if (isError(loginResult)) {
            return loginResult;
        }

        this.setState({providedData: {...providedData, user: loginResult}});

        return loginResult;
    };

    register = async (userLogin: string, userPassword: string): Promise<MainServerApiResponseType | Error> => {
        const result = await register(userLogin, userPassword);

        if (isError(result)) {
            return result;
        }

        console.log(result);

        return result;
    };

    getProviderValue(): UserContextType {
        const {state} = this;
        const {providedData} = state;
        const {user} = providedData;

        return {
            user,
            login: this.login,
            register: this.register,
        };
    }

    render(): Node {
        const {props} = this;
        const {children} = props;

        const providedData = this.getProviderValue();

        return <UserContextProvider value={providedData}>{children}</UserContextProvider>;
    }
}
