import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs-compat';

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
    private authService: AuthService) { }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes();
  }

  ngOnInit(): void {
    this.userSub = this.authService.userSubject.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onLogout(){
    this.authService.loguot();
  }
}
