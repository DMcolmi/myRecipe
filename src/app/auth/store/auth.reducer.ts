import { Action } from "@ngrx/store";
import { User } from "../user.model";
import { AuthActions, LOGIN, LOGIN_FAIL, LOGIN_START, LOGOUT } from "./auth.action";

export interface State{
    user: User;
    authError: string;
}

const initialState: State = {
    user: null,
    authError: null,
}

export function authReducer(state: State = initialState, action: AuthActions){
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                user: new User(action.payload.email, action.payload.id, action.payload.token, action.payload.tokenExpirationDate),
                authError: null
            };
        case LOGOUT:
            return{
                ...state,
                user: null,
                authError: null
            };
        case LOGIN_START:
            return{
                ...state,
                authError: null
            };
        case LOGIN_FAIL:
            return{
                ...state,
                user: null,
                authError: action.payload
            }
        default:
            return state;
    }
}