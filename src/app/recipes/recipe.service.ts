import { EventEmitter, inject, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs-compat';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe-list/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();
  recipeSelected = new Subject<Recipe>();
  
  private recipes: Recipe[] = [
    new Recipe('Recipe Test Title', 'Recipe description test', 
    'https://www.negroni.com/sites/negroni.com/files/styles/scale__1440_x_1440_/public/panini_farciti.jpg?itok=kewT82jY', 
    [new Ingredient("pane", 2), new Ingredient("carne", 1)]),
    new Recipe('Carbonara', 'Recipe2 description test', 
    'https://blog.giallozafferano.it/albe/wp-content/uploads/2020/08/15FA1142-B5FA-410C-878B-2B8745B85F64.jpeg', 
    [new Ingredient("cotoletta", 2), new Ingredient("partatine", 20)])
  ];

  constructor() { }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe{
    return this.recipes.slice()[id];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

}

export const recipeResolver: ResolveFn<Observable<Recipe> | Promise<Recipe> | Recipe> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log('recipeResolver');  
  return inject(RecipeService).recipeSelected;
}
 