import { Recipe } from "../recipe-list/recipe.model";
import { ADD_RECIPE, DELETE_RECIPE, RecipesActions, SET_RECIPES, UPDATE_RECIPE } from "./recipes.actions";

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
        case ADD_RECIPE: {
            return {
            ...state,
            recipes: [...state.recipes, action.payload ]
            }
        };
        case UPDATE_RECIPE: {
            const updatedRecipe = {...state.recipes[action.payload.index], ...action.payload.recipe};
            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;
            return {
            ...state,
            recipes: updatedRecipes
            }
        };
        case DELETE_RECIPE: {
            const updatedRecipes = [...state.recipes];
            updatedRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: updatedRecipes
            }
        };
        default:
            return state;
    }
}