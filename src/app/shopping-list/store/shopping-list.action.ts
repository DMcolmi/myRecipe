import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENT_LIST = 'ADD_INGREDIENT_LIST';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const EDIT_INGREDIENT = 'EDIT_INGREDIENT';

export type ShoppingListActions = AddIngredient | AddIngredientList | DeleteIngredient | EditIngredient;

export class AddIngredient implements Action {
    readonly type: string = ADD_INGREDIENT;
    constructor(public payload : Ingredient){}
}

export class AddIngredientList implements Action {
    readonly type: string = ADD_INGREDIENT_LIST;
    constructor(public payload: Ingredient[]){}
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
    constructor(public payload: number){};
}

export class EditIngredient implements Action {
    readonly type = EDIT_INGREDIENT;
    constructor(public payload: {index: number, ingredient: Ingredient}){};
}