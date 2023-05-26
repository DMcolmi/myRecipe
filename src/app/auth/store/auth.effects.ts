import { Actions, createEffect, ofType } from "@ngrx/effects";
import {switchMap} from "rxjs";
import * as AuthActions from "./auth.action";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";


export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

export class AuthEffects{

    authLogin = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap( (authData: AuthActions.LoginStart) =>{
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' 
                + environment.fireBaseAPIKey,
                { email: authData.payload.email, password: authData.payload.password, returnSecureToken: true }
                );
            
        })
    ));


    constructor(private actions$: Actions, private http: HttpClient){}


}