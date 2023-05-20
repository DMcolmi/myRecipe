import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.action";

const initialState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 6),
      ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch(action.type) {
    case ShoppingListActions.ADD_INGREDIENT:      
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENT_LIST:
      return{
        ...state,
        ingredients: [...state.ingredients.concat(action.payload)]
      }
    case ShoppingListActions.DELETE_INGREDIENT:
      // let deleteIngredientList = [...state.ingredients];      
      // deleteIngredientList.splice(+action.payload, 1);
      return{
        ...state,
        ingredients: state.ingredients.filter((ing: Ingredient, index: number) => index != +action.payload)
      }

    case ShoppingListActions.EDIT_INGREDIENT:      
      const ingredient = {...state.ingredients[action.payload['index']]};
      const updatedIngredient= {...ingredient, ...action.payload['ingredient']};
      const updatedIngredientList = [...state.ingredients];
      updatedIngredientList[action.payload['index']] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredientList
      }

    default:
      return initialState;
  }
}