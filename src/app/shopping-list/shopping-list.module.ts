import { NgModule } from "@angular/core";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShopingListComponent } from "./shopping-list.component";
import { FormsModule } from "@angular/forms";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        ShoppingListEditComponent,
        ShopingListComponent,
    ],
    imports: [
        FormsModule,
        ShoppingListRoutingModule,
        SharedModule
    ],
    providers: [],
    exports: []
})
export class ShoppingListModule{}