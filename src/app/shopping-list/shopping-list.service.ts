import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs-compat';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingridientsChanged = new Subject<Ingredient[]>();
  ingredientEditStart = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 6),
  ];

  constructor() { }

  onNewIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingridientsChanged.next(this.ingredients.slice());
  }

  getIngredientByIndex(index: number): Ingredient{
    return this.ingredients[index];
  }

  getIngredients(){
    return this.ingredients.slice();
  }

  updateIngredient(index: number, updatedIngredient: Ingredient) {
    this.ingredients[index] = updatedIngredient;
    this.ingridientsChanged.next(this.ingredients.slice());
  }

  fromRecipeToShoppingList(recipeIngredients: Ingredient[]){
    for(let i = 0; i < recipeIngredients.length ; i++){
      this.onNewIngredient(recipeIngredients[i]);
    }
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingridientsChanged.next(this.ingredients.slice());
  }
}
