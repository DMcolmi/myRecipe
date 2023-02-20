import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe('Recipe Test Title', 'Recipe description test', 
    'https://www.negroni.com/sites/negroni.com/files/styles/scale__1440_x_1440_/public/panini_farciti.jpg?itok=kewT82jY')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
