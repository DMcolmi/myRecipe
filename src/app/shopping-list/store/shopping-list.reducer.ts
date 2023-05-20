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
      let deleteIngredientList = [...state.ingredients];      
      deleteIngredientList.splice(+action.payload, 1);
      return{
        ...state,
        ingredients: deleteIngredientList
      }

    case ShoppingListActions.EDIT_INGREDIENT:      
      let editIngredientList = [...state.ingredients];
      editIngredientList[action.payload['index']] = action.payload['ingredient'];
      return {
        ...state,
        ingredients: editIngredientList
      }

    default:
      return initialState;
  }
}