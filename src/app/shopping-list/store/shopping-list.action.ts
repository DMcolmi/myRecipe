import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT';
export const ADD_INGREDIENT_LIST = '[Shopping List] ADD_INGREDIENT_LIST';
export const DELETE_INGREDIENT = '[Shopping List] DELETE_INGREDIENT';
export const EDIT_INGREDIENT = '[Shopping List] EDIT_INGREDIENT';
export const START_EDIT = '[Shopping List] START_EDIT';
export const STOP_EDIT = '[Shopping List] STOP_EDIT';

export type ShoppingListActions = AddIngredient 
| AddIngredientList | DeleteIngredient 
| EditIngredient | StartEditIngredient | StopEditIngredient;

export class AddIngredient implements Action {
    readonly type: string = ADD_INGREDIENT;
    constructor(public payload : Ingredient){}
}

export class AddIngredientList implements Action {
    readonly type: string = ADD_INGREDIENT_LIST;
    constructor(public payload: Ingredient[]){}
}

export class DeleteIngredient implements Action {
    readonly type: string  = DELETE_INGREDIENT;
    payload;
}

export class EditIngredient implements Action {
    readonly type: string  = EDIT_INGREDIENT;
    constructor(public payload: Ingredient){};
}

export class StartEditIngredient implements Action {
    readonly type: string  = START_EDIT;
    constructor(public payload: number){};
}

export class StopEditIngredient implements Action {
    readonly type: string  = STOP_EDIT;
    payload;
}