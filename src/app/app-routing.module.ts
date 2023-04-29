import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { SelectRecipeComponent } from './recipes/recipe-detail/select-recipe/select-recipe.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { recipeResolver } from './recipes/recipe.service';
import { RecipesComponent } from './recipes/recipes.component';
import { ShopingListComponent } from './shopping-list/shopping-list.component';
import { recipesResolverFromBe } from './shared/data-storage.service';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, resolve:{recipes: recipesResolverFromBe}, children: [
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve:{recipes: recipesResolverFromBe}},//, resolve: {recipe: recipeResolver}
    {path: '', component: SelectRecipeComponent} ,
    {path: ':id/edit', component: RecipeEditComponent},
  ]},
  {path: 'shopping-list', component: ShopingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
