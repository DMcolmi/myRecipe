import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe-list/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  
  @Input() recipeDetail: Recipe = new Recipe("", "", "", []);
  
  constructor(private shoppingListService: ShoppingListService) { }
  
  ngOnInit(): void {
  }
  
  toShoppinglist() {
    this.shoppingListService.fromRecipeToShoppingList(this.recipeDetail.ingredients);
  }
}
