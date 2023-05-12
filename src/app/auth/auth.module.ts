import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth/auth.component";
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from "../shared/shared.module";

const authRoute: Routes = [
    { path: '', component: AuthComponent }
]

@NgModule({
    declarations: [AuthComponent],
    imports: [
        RouterModule.forChild(authRoute),
        SharedModule,
    ]
})
export class AuthModule { }