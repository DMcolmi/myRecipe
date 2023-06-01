import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, of, catchError, map, tap, throwError } from "rxjs";
import * as AuthActions from "./auth.action";
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';


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

    constructor(
        private actions$: Actions
        , private http: HttpClient
        , private router: Router
        , private authService: AuthService) { }


    authLogin = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
                + environment.fireBaseAPIKey,
                { email: authData.payload.email, password: authData.payload.password, returnSecureToken: true }
            ).pipe(
                tap(resData => {this.authService.setLogoutTimer(+resData.expiresIn * 1000)}),
                map(resData => {
                    return this.handleAuthentication(resData);
                }),
                catchError(errorRes => {
                    return this.handleError(errorRes);
                })
            );
        })
    ));    

    signUp = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signUpData: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' 
                + environment.fireBaseAPIKey,
                { email: signUpData.payload.email, password: signUpData.payload.password, returnSecureToken: true }
            ).pipe(
                tap(resData => {this.authService.setLogoutTimer(+resData.expiresIn * 1000)}),
                map(resData => {
                    return this.handleAuthentication(resData);
                }),
                catchError(errorRes => {
                    return this.handleError(errorRes);
                })
            )
        })
    ));

    authRedirect = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => {
            this.router.navigate(['/']);
        })
    ), { dispatch: false }
    );

    authLogout = createEffect(()=> this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(()=>{
            localStorage.clear();
            this.authService.clearLogoutTimer();
            this.router.navigate(['auth']);
        })
    ), {dispatch: false});

    autoLogin = createEffect(()=> this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(()=> {            
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
        
            if (!userData) {
                return {type: 'DUMMY'};;
            }
        
            const loadedUser: User = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            );
        
            if (loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);
                return new AuthActions.AuthenticateSuccess( {email: loadedUser.email, id: loadedUser.id, token: loadedUser.token, tokenExpirationDate: new Date(userData._tokenExpirationDate)});
            }
            return {type: 'DUMMY'};
        })
    ));

    private handleAuthentication(resData: AuthResponseData): AuthActions.AuthenticateSuccess {
        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
        localStorage.setItem('userData', JSON.stringify(user));
        
        return new AuthActions.AuthenticateSuccess({
            email: resData.email,
            id: resData.localId,
            token: resData.idToken,
            tokenExpirationDate: expirationDate
        });
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknoiwn error occurred!';
        if (!errorRes.error || !errorRes.error.error)
            return of(new AuthActions.AuthethicateFail(errorMessage));
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
        return of(new AuthActions.AuthethicateFail(errorMessage));
    }
}