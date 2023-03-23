import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs-compat';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingridientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 6),
  ];

  constructor() { }

  onNewIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.ingridientsChanged.next(this.ingredients.slice());
  }

  getIngredients(){
    return this.ingredients.slice();
  }

  fromRecipeToShoppingList(recipeIngredients: Ingredient[]){
    for(let i = 0; i < recipeIngredients.length ; i++){
      this.onNewIngredient(recipeIngredients[i]);
    }
  }
}
