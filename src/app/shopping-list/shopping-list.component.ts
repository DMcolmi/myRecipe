import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { LoggingService } from "../logging.service";
import { Store } from "@ngrx/store";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShopingListComponent implements OnInit, OnDestroy {

    ingredients: Observable<{ingredients: Ingredient[]}>;
    //private subscription: Subscription;

    constructor(
        private shoppingListService: ShoppingListService, 
        private loggingService: LoggingService,
        private store: Store<{shoppingList: {ingredients: Ingredient[]}}> ) { }

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
        this.shoppingListService.ingredientEditStart.next(index);        
    }

    ngOnDestroy(): void {
        //this.subscription.unsubscribe();
    }
}