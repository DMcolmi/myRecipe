import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Logout } from '../auth/store/auth.action';
import { FetchRecipes } from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  isAuthenticated = false;
  collapsed = true;

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipes());
    }

  ngOnInit(): void {
    this.userSub = this.store.subscribe(AppState => {
      this.isAuthenticated = !! AppState.auth.user;
    });
  }

  onLogout(){    
    this.store.dispatch(new Logout());
  }
}
