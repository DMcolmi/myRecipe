import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const LOGIN_FAIL = '[Auth] Login Fail'

export class Login implements Action {
    readonly type: string = LOGIN;
    constructor(public payload: {email: string, id: string, token: string, tokenExpirationDate: Date}){};
}

export class Logout implements Action {
    readonly type: string = LOGOUT;
    payload;
}

export class LoginStart implements Action {
    type: string = LOGIN_START;
    constructor(public payload: {email: string, password: string}){};
}

export class LoginFail implements Action {
    type: string = LOGIN_FAIL;
    constructor(public payload: string){};    
}

export type AuthActions = Login | Logout | LoginStart | LoginFail;