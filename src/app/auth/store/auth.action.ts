import { Action } from "@ngrx/store";

export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';

export class Login implements Action {
    readonly type: string = LOGIN;
    constructor(public payload: {email: string, id: string, token: string, tokenExpirationDate: Date}){};
}

export class Logout implements Action {
    readonly type: string = LOGOUT;
    payload;
}

export type AuthActions = Login | Logout;