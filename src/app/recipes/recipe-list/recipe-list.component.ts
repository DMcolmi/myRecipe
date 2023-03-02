import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() selectedRecipe = new EventEmitter<Recipe>();
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  onRecipeSelected(recipeIn: Recipe) {
    console.log("recipe clicked");       
    this.selectedRecipe.emit(recipeIn);
  }

  recipes: Recipe[] = [
    new Recipe('Recipe Test Title', 'Recipe description test', 
    'https://www.negroni.com/sites/negroni.com/files/styles/scale__1440_x_1440_/public/panini_farciti.jpg?itok=kewT82jY', 'pane, tonno, maionese, pomodoro, insalata'),
    new Recipe('Recipe2 Test Title', 'Recipe2 description test', 
    'https://www.negroni.com/sites/negroni.com/files/styles/scale__1440_x_1440_/public/panini_farciti.jpg?itok=kewT82jY', 'pane2, tonno2, maionese2, pomodoro2, insalata2')
  ];
}
