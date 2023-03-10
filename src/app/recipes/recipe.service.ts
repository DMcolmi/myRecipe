import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe-list/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Recipe Test Title', 'Recipe description test', 
    'https://www.negroni.com/sites/negroni.com/files/styles/scale__1440_x_1440_/public/panini_farciti.jpg?itok=kewT82jY', 
    [new Ingredient("pane", 2), new Ingredient("carne", 1)]),
    new Recipe('Recipe2 Test Title', 'Recipe2 description test', 
    'https://www.negroni.com/sites/negroni.com/files/styles/scale__1440_x_1440_/public/panini_farciti.jpg?itok=kewT82jY', 
    [new Ingredient("cotoletta", 2), new Ingredient("partatine", 20)])
  ];

  constructor() { }

  getRecipes(){
    return this.recipes.slice();
  }

}
