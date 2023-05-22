import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { LoggingService } from "../logging.service";
import { Store } from "@ngrx/store";
import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';
import { StartEditIngredient } from "./store/shopping-list.action";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShopingListComponent implements OnInit, OnDestroy {

    ingredients: Observable<{ingredients: Ingredient[]}>;
    //private subscription: Subscription;

    constructor(
        private loggingService: LoggingService,
        private store: Store<fromShoppingList.AppState> ) { }

    ngOnInit(): void {
        this.ingredients = this.store.select('shoppingList');
        // this.subscription = this.shoppingListService.ingridientsChanged.subscribe(
        //     (newIngredients: Ingredient[]) => {
        //         this.ingredients = newIngredients;
        //     }
        // )
        this.loggingService.printLog('hello from ShoppingListComponent ngOnInit');
    }

    onEditIngredeient(index: number){
        //this.shoppingListService.ingredientEditStart.next(index);  
        this.store.dispatch(new StartEditIngredient(index));    
    }

    ngOnDestroy(): void {
        //this.subscription.unsubscribe();
    }
}