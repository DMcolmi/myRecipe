import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard  {
    constructor(private router: Router, private authService: AuthService, private store: Store<AppState>) { }

    canActivate: CanActivateFn = (
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
           
        return  this.store.select('auth').pipe(
        map(state => {return state.user}), 
        map(user => {
            const isAuth = !!user;
            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree(['auth']);
        }));
    }
}
