import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FETCH_RECIPES, STORE_RECIPES, SetRecipes } from "./recipes.actions";
import {switchMap, map, tap , withLatestFrom} from "rxjs"
import { Recipe } from "../recipe-list/recipe.model";
import { AppState } from "src/app/store/app.reducer";
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffects{

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<AppState>){};

    fetchRecipes = createEffect( ()=> this.actions$.pipe(
        ofType(FETCH_RECIPES),
        switchMap( () => {
            return this.http.get<Recipe[]>(
                'https://ng-course-recipe-book-a0a47-default-rtdb.firebaseio.com/recipes.json'
            )}
        ),
        map( (recipes: Recipe[])=> {
            return recipes.map(
                recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
        }),
        map(recipes => {
            return new SetRecipes(recipes);            
        })
    ));

    sotoreRecipes = createEffect( ()=> this.actions$.pipe(
        ofType(STORE_RECIPES),
        withLatestFrom( this.store.select('recipes')),
        switchMap(([actionData, recipeState])=> {
            return this.http.put('https://ng-course-recipe-book-a0a47-default-rtdb.firebaseio.com/recipes.json', recipeState.recipes)
        })
    ),{dispatch: false});

}