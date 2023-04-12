import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from './recipe.model';
import { Subscription } from 'rxjs-compat';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  sub: Subscription;

  constructor(private recipeService: RecipeService) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

    this.sub = this.recipeService.recipesChanged.subscribe((recipes) => {
      this.recipes = recipes;
    }
    )
  }
}
