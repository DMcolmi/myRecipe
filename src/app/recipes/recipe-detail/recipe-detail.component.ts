import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.service';
import { Store } from '@ngrx/store';
import { AddIngredientList } from 'src/app/shopping-list/store/shopping-list.action';
import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeDetail: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromShoppingList.AppState>
  ) {
  }

  ngOnInit(): void {

    this.route.data.subscribe(({ recipe }) => {
      console.log(recipe);

      this.route.paramMap
        .subscribe(params => {
          this.recipeDetail = recipe[params.get('id')];
        }
        );
    })


    //  this.route.data.subscribe(
    //     ({recipe}) => {
    //       console.log(recipe);        
    //     }      
    //   ) 
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  toShoppinglist() {
    this.store.dispatch(new AddIngredientList(this.recipeDetail.ingredients));
  }
}
