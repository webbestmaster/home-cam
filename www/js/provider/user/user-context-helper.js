// @flow

import {mongoUserRoleMap} from './user-context-const';

import type {UserContextType} from './user-context-type';

export function isAdmin(userContextData: UserContextType): boolean {
    return userContextData.user.role === mongoUserRoleMap.admin;
}
