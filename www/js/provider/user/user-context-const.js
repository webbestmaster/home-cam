// @flow

import type {MainServerApiResponseType} from '../../type/response';

import type {MongoUserFrontType} from './user-context-type';

export const mongoUserRoleMap = {
    user: 'user',
    admin: 'admin',
};

export const defaultUserFrontState: MongoUserFrontType = {
    role: mongoUserRoleMap.user,
    login: '',
    registerDate: 0,
    rating: 0,
};

export const defaultUserContextData = {
    user: defaultUserFrontState,
    login: (userLogin: string, userPassword: string): Promise<MongoUserFrontType | Error> =>
        Promise.resolve(defaultUserFrontState),
    register: (userLogin: string, userPassword: string): Promise<MainServerApiResponseType | Error> =>
        Promise.resolve(new Error('You should override this method')),
};
