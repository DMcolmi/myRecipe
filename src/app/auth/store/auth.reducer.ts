import { Action } from "@ngrx/store";
import { User } from "../user.model";
import { AuthActions, AUTHENTICATE_SUCCESS, AUTHENTICATE_FAIL, LOGIN_START, LOGOUT, SIGNUP_START, ERROR_MESSAGE_CLOSE } from "./auth.action";

export interface State{
    user: User;
    authError: string;
    loading: boolean;
}

const initialState: State = {
    user: null,
    authError: null,
    loading: false,
}

export function authReducer(state: State = initialState, action: AuthActions){
    switch(action.type){
        case AUTHENTICATE_SUCCESS:
            return {
                ...state,
                user: new User(action.payload.email, action.payload.id, action.payload.token, action.payload.tokenExpirationDate),
                authError: null,
                loading: false,
            };
        case LOGOUT:
            return{
                ...state,
                user: null,
                authError: null,
            };
        case LOGIN_START:
        case SIGNUP_START:
            return{
                ...state,
                authError: null,
                loading: true,
            };
        case AUTHENTICATE_FAIL:
            return{
                ...state,
                user: null,
                authError: action.payload,
                loading: false,
            };
        case ERROR_MESSAGE_CLOSE:
            return{
                ...state,
                authError: null
            };
        default:
            return state;
    }
}