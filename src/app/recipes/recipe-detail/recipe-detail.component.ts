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
  id:number;

  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.recipeDetail = this.recipeService.getRecipes()[params['id']];
    });

  //  this.route.data.subscribe(
  //     ({recipe}) => {
  //       console.log(recipe);        
  //     }      
  //   ) 
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  toShoppinglist() {
    this.shoppingListService.fromRecipeToShoppingList(this.recipeDetail.ingredients);
  }
}
