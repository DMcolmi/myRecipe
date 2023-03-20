import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe-list/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeDetail: Recipe;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      console.log(params['id']);      
        this.recipeDetail = this.recipeService.getRecipes()[params['id']];
    });

  //  this.route.data.subscribe(
  //     ({recipe}) => {
  //       console.log(recipe);        
  //     }      
  //   ) 
  }

  toShoppinglist() {
    this.shoppingListService.fromRecipeToShoppingList(this.recipeDetail.ingredients);
  }
}
