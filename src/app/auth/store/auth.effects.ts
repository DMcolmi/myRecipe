import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, of, catchError , map } from "rxjs";
import * as AuthActions from "./auth.action";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {
    
    constructor(private actions$: Actions, private http: HttpClient) { }

    authLogin = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
                + environment.fireBaseAPIKey,
                { email: authData.payload.email, password: authData.payload.password, returnSecureToken: true }
            ).pipe(                
                map(resData => {
                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                    return of(new AuthActions.Login({
                        email: resData.email, 
                        userId: resData.idToken, 
                        token: resData.refreshToken, 
                        expirationDate: expirationDate}));
                }),
                catchError(error => {
                    return of();
                })
            );

        })
    ));




}