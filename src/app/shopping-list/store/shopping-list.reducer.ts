import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.action";

export interface AppState {
  shoppingList: State,
}

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 6),
  ],
  editedIngredient: null,
  editedIngredientIndex: null,
};

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENT_LIST:
      return {
        ...state,
        ingredients: [...state.ingredients.concat(action.payload)]
      }
    case ShoppingListActions.DELETE_INGREDIENT:
      // let deleteIngredientList = [...state.ingredients];      
      // deleteIngredientList.splice(+action.payload, 1);
      return {
        ...state,
        ingredients: state.ingredients.filter((ing: Ingredient, index: number) => index != state.editedIngredientIndex),
        editedIngredient: null,
        editedIngredientIndex: -1
      }

    case ShoppingListActions.EDIT_INGREDIENT:
      const updatedIngredient = { ...state.editedIngredient, ...action.payload };
      const updatedIngredientList = [...state.ingredients];
      updatedIngredientList[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredientList,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[+action.payload]};
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: editedIngredient
      }
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      }

    default:
      return initialState;
  }
}