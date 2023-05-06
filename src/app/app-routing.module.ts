import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { SelectRecipeComponent } from './recipes/recipe-detail/select-recipe/select-recipe.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShopingListComponent } from './shopping-list/shopping-list.component';
import { savedRecipesResolver } from './shared/data-storage.service';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuard } from "./auth/auth-guard";


const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], resolve:{recipes: savedRecipesResolver}, children: [
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve:{recipe: savedRecipesResolver}},//, resolve: {recipe: recipeResolver}
    {path: '', component: SelectRecipeComponent} ,
    {path: ':id/edit', component: RecipeEditComponent, resolve:{recipe: savedRecipesResolver}},
  ]},
  {path: 'shopping-list', component: ShopingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
