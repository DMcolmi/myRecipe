import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShopingListComponent } from "./shopping-list.component";

const shoppingListRoutes: Routes = [
    { path: 'shopping-list', component: ShopingListComponent}
];

@NgModule({
    imports: [RouterModule.forChild(shoppingListRoutes)],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule{}