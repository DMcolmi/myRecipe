import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { SelectRecipeComponent } from './recipes/recipe-detail/select-recipe/select-recipe.component';
import { recipeResolver } from './recipes/recipe.service';
import { RecipesComponent } from './recipes/recipes.component';
import { ShopingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
    {path: ':id', component: RecipeDetailComponent},//, resolve: {recipe: recipeResolver}
    {path: '', component: SelectRecipeComponent} 
  ]},
  {path: 'shopping-list', component: ShopingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
