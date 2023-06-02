import { Recipe } from "../recipe-list/recipe.model";
import { RecipesActions, SET_RECIPES } from "./recipes.actions";

export interface State{
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
}


export function recepiesReducer (state: State = initialState, action: RecipesActions){
    switch(action.type){
        case SET_RECIPES: {
            return {
                ...state,
                recipes: [...action.payload]
            }
        };
        default:
            return state;
    }
}