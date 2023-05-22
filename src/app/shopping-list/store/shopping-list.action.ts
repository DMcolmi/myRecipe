import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENT_LIST = 'ADD_INGREDIENT_LIST';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const EDIT_INGREDIENT = 'EDIT_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';

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
    readonly type = DELETE_INGREDIENT;
    constructor(){};
}

export class EditIngredient implements Action {
    readonly type = EDIT_INGREDIENT;
    constructor(public payload: Ingredient){};
}

export class StartEditIngredient implements Action {
    readonly type = START_EDIT;
    constructor(public payload: number){};
}

export class StopEditIngredient implements Action {
    readonly type = STOP_EDIT;
}