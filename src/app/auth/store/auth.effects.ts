import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, of, catchError, map, tap, throwError } from "rxjs";
import * as AuthActions from "./auth.action";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';


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

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }

    
    authLogin = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
                + environment.fireBaseAPIKey,
                { email: authData.payload.email, password: authData.payload.password, returnSecureToken: true }
            ).pipe(
                map(resData => {
                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                    return new AuthActions.Login({
                        email: resData.email,
                        id: resData.idToken,
                        token: resData.refreshToken,
                        tokenExpirationDate: expirationDate
                    });
                }),
                catchError(errorRes => {
                    let errorMessage = 'An unknoiwn error occurred!';
                    if (!errorRes.error || !errorRes.error.error)
                        return of(new AuthActions.LoginFail(errorMessage));
                    switch (errorRes.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email already exists';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage = 'This email does not exists';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage = 'Password not correct';
                        break;
                    }
                    return of(new AuthActions.LoginFail(errorMessage));
                })
            );
        })
    ));

    authSuccess = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(()=> {
            this.router.navigate(['/']);
        })
    ), {dispatch:false}
    );
}