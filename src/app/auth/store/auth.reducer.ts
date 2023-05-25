import { Action } from "@ngrx/store";
import { User } from "../user.model";
import { AuthActions, LOGIN, LOGOUT } from "./auth.action";

export interface State{
    user: User;
}

const initialState: State = {
    user: null
}

export function authReducer(state: State = initialState, action: AuthActions){
    switch(action.type){
        case LOGIN:
            return {
                ...state,
                user: new User(action.payload.email, action.payload.id, action.payload.token, action.payload.tokenExpirationDate)
            }
        case LOGOUT:
            return{
                ...state,
                user: null
            }
        default:
            return state;
    }
}