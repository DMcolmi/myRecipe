import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from './recipe-list/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipeForDetail: Recipe;

  onInputEvent(recipeIn: Recipe) {
    console.log(recipeIn);
    this.recipeForDetail = recipeIn;
  }

  @Input() selectedRecipe: Recipe

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe){
    this.selectedRecipe = recipe;
    console.log(recipe);
    
  }

}
