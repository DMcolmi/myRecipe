import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe-list/recipe.model';
import { Store } from '@ngrx/store';
import { AddIngredientList } from 'src/app/shopping-list/store/shopping-list.action';
import * as fromAppStore from 'src/app/store/app.reducer';
import { switchMap, of, catchError, map, tap, throwError } from "rxjs";
import { State } from '../store/recipes.reducer';
import { DeleteRecipe } from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeDetail: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppStore.AppState>
  ) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: Params) =>{
      this.id = params.get('id');
      console.log(this.id);

      this.store.select('recipes').pipe(
        map( (recipeState: State) => {
          const recipe = recipeState.recipes[this.id];
          return recipe;
          })        
      ).subscribe( (recipe: Recipe) => {
        this.recipeDetail = recipe;
      }
      );
    });
  }

  deleteRecipe() {
    //this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  toShoppinglist() {
    this.store.dispatch(new AddIngredientList(this.recipeDetail.ingredients));
  }
}
