import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENT_LIST = 'ADD_INGREDIENT_LIST';

export type ShoppingListActions = AddIngredient | AddIngredientList;

export class AddIngredient implements Action {
    readonly type: string = ADD_INGREDIENT;
    constructor(public payload : Ingredient){}
}

export class AddIngredientList implements Action {
    readonly type: string = ADD_INGREDIENT_LIST;
    constructor(public payload: Ingredient[]){}
}