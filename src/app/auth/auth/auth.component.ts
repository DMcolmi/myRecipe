import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { LoginStart } from '../store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router,
    private store: Store<AppState>) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {
  }

  onSubmit(authform: NgForm) {
    const email = authform.value.email;
    const password = authform.value.password;

    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      //authObs = this.authService.login(email, password);
      this.store.dispatch(new LoginStart({ email: email, password: password }));
    } else {
      authObs = this.authService.signup(email, password);
    }

    this.store.select('auth').subscribe(authState => {

    }
    );

    /*     authObs.subscribe(
          response => {
            console.log(response);
            this.isLoading = false;
            this.router.navigate(['./recipes']);
          },
          errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
          }); */

    authform.reset();
  }

  setErrorMessage(message: string) {
    this.error = message;
  }
}
