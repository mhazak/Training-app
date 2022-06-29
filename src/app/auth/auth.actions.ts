import { Action } from "@ngrx/store";

export const SET_NON_AUTH = '[AUTH] NON AUTHENTICATED';
export const SET_AUTH = '[AUTH] AUTHENTICATED';

export class SetAuthenticated implements Action {
	readonly type = SET_AUTH;
}

export class SetUnauthenticated implements Action {
	readonly type = SET_NON_AUTH;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated;
