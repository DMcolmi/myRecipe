import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] LOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const AUTHENTICATE_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Singup Start'
export const ERROR_MESSAGE_CLOSE = '[Auth] Error Message Close';
export const AUTO_LOGIN = '[Auth] Auto Login'; 

export class AuthenticateSuccess implements Action {
    readonly type: string = AUTHENTICATE_SUCCESS;
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

export class AuthethicateFail implements Action {
    type: string = AUTHENTICATE_FAIL;
    constructor(public payload: string){};    
}

export class SignupStart implements Action {
    type: string = SIGNUP_START;
    constructor(public payload: {email: string, password: string}){};
}

export class ErrorMessageClose implements Action {
    type: string = ERROR_MESSAGE_CLOSE;
    payload;
}

export class AutoLogin implements Action {
    type: string = AUTO_LOGIN;
    payload;
}

export type AuthActions = AuthenticateSuccess 
| Logout | LoginStart | AuthethicateFail 
| SignupStart | ErrorMessageClose | AutoLogin;