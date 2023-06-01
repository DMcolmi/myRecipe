import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { ErrorMessageClose, LoginStart, SignupStart } from '../store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  authSub: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnDestroy(): void {
    if(this.authSub){
      this.authSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {
    this.authSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
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
      //authObs = this.authService.signup(email, password);
      this.store.dispatch(new SignupStart({ email: email, password: password }));
    }
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

  setErrorMessage() {
    this.error = null;
    this.store.dispatch(new ErrorMessageClose());
  }
}
