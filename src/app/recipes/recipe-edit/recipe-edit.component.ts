import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe-list/recipe.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { State } from '../store/recipes.reducer';
import { UpdateRecipe } from '../store/recipes.actions';
import { AddRecipe } from '../store/recipes.actions';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {


  private id: number;
  private editMode = false;
  recipeForm: FormGroup;
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnDestroy(): void {
    if(this.storeSub)
      this.storeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = + params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.initForm();
      }
    );
  }

  private initForm() {

    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      this.storeSub = this.store.select('recipes').subscribe((recipeState: State)=> {
        
        const recipe = recipeState.recipes[this.id];

        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe.ingredients) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, 
                  [Validators.required, Validators.pattern(/^0*?[1-9]\d*$/)])
              })
            );
          }
        }

      });

    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    }
    );
  }

  get ingredients(){
    return this.recipeForm.get('ingredients') as FormArray;
  }


  onSubmit() {
    console.log(this.recipeForm);

    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.ingredients.value['ingredients']
    );
    if(this.editMode){
      this.store.dispatch(new UpdateRecipe({index: this.id, recipe: this.recipeForm.value}))
      //this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.store.dispatch(new AddRecipe(this.recipeForm.value));
      //this.recipeService.addRecipe(this.recipeForm.value);
    }
    
    this.onCancel();
  }

  addIngredient(){
    this.ingredients.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null,
        [Validators.required, Validators.pattern(/^0*?[1-9]\d*$/)])
    }))
  }

  removeIngredient(i){
    this.ingredients.removeAt(i);
  }

  saveIngredient(i){
    this.ingredients[i] = i;
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
