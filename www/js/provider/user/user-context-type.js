// @flow

import type {MainServerApiResponseType} from '../../type/response';
export type MongoUserRoleType = 'user' | 'admin';

export type MongoUserFrontType = {|
    +role: MongoUserRoleType,
    +login: string,
    +registerDate: number,
    +rating: number,
|};

export type UserContextType = {|
    +user: MongoUserFrontType,
    +login: (login: string, password: string) => Promise<MongoUserFrontType | Error>,
    +register: (login: string, password: string) => Promise<MainServerApiResponseType | Error>,
|};
