import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard";
import { savedRecipesResolver } from "../shared/data-storage.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { SelectRecipeComponent } from "./recipe-detail/select-recipe/select-recipe.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesComponent } from "./recipes.component";


const recipesRoutes: Routes = [    
  {path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], resolve:{recipes: savedRecipesResolver}, children: [
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent, resolve:{recipe: savedRecipesResolver}},//, resolve: {recipe: recipeResolver}
    {path: '', component: SelectRecipeComponent} ,
    {path: ':id/edit', component: RecipeEditComponent, resolve:{recipe: savedRecipesResolver}},
  ]},
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule{

}