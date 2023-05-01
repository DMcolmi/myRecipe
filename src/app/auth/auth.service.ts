import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseDarta {
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string){
    return this.http.post<AuthResponseDarta>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAqnjL5q5OLXQBCgXDr56XtmuA-VlL03h4',
    {email: email, password: password, returnSecureToken: true});
  }
}
