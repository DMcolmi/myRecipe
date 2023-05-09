import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopingListComponent } from './shopping-list/shopping-list.component';
import { AuthComponent } from './auth/auth/auth.component';


const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: 'auth', component: AuthComponent},
  { path: 'shopping-list', component: ShopingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
