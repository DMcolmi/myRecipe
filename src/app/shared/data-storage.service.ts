import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Recipe } from "../recipes/recipe-list/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducer";
import { FetchRecipes, SetRecipes } from "../recipes/store/recipes.actions";


@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private store: Store<AppState>) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-a0a47-default-rtdb.firebaseio.com/recipes.json', recipes).
            subscribe(response => { console.log(response) });
    }

    fetchRecipes() {

        return this.http.get<Recipe[]>(
            'https://ng-course-recipe-book-a0a47-default-rtdb.firebaseio.com/recipes.json'
        ).pipe(
            map(recipes => {
                return recipes.map(
                    recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
            }),
            tap(recipes => {

                if (this.recipeService.getRecipes().length < 1) {
                    //this.recipeService.setRecipes(recipes);
                    this.store.dispatch(new SetRecipes(recipes));
                }
            })
        );
    }
}

export const savedRecipesResolver: ResolveFn<any> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        
        const store= inject(Store<AppState>)
        return store.select('recipes')
        .pipe(
          map(recipeState => {
            if(recipeState.recipes.length > 0){
                console.log(recipeState.recipes)
                return recipeState.recipes;
            }
            return store.dispatch(new FetchRecipes());
        }));
          
    }

