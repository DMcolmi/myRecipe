import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs-compat";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShopingListComponent implements OnInit, OnDestroy {

    ingredients: Ingredient[];
    private subscription: Subscription;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
        this.ingredients = this.shoppingListService.getIngredients();
        this.subscription = this.shoppingListService.ingridientsChanged.subscribe(
            (newIngredients: Ingredient[]) => {
                this.ingredients = newIngredients;
            }
        )
    }

    onEditIngredeient(index: number){
        this.shoppingListService.ingredientEditStart.next(index);        
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}