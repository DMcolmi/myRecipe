import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Recipe } from "../recipes/recipe-list/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map } from "rxjs/operators";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs-compat";


@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService) {}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-a0a47-default-rtdb.firebaseio.com/recipes.json', recipes).
        subscribe(response => {console.log(response)});
    }

    fetchRecipes(){
        this.http.get<Recipe[]>('https://ng-course-recipe-book-a0a47-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
            map(recipes => {
                return recipes.map(
                    recipe => { return {...recipe, ingredients: recipe.ingredients? recipe.ingredients : []}});
            })
        ).
        subscribe(recipes => {
            this.recipeService.setRecipes(recipes);
        });
    }
}

export const recipesResolverFromBe: ResolveFn<any> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log('recipeResolver');  
  return inject(DataStorageService).fetchRecipes();
}