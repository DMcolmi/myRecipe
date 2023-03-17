import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe-list/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  
  @Input() recipeDetail: Recipe = new Recipe("", "", "", []);
  recipeDetail2: Recipe;
  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute
    ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.recipeDetail2 = params['recipe'];
      }      
    );

  }
  
  toShoppinglist() {
    this.shoppingListService.fromRecipeToShoppingList(this.recipeDetail.ingredients);
  }
}
