import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AddIngredient, DeleteIngredient, EditIngredient, StopEditIngredient } from '../store/shopping-list.action';
import * as fromShoppingList from 'src/app/shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  ingredientEditSubscription: Subscription;
  editMode: boolean = false;
  ingredientEditIndex: number;
  editedIngredient: Ingredient;

  @ViewChild('f', { static: false })
  ingredeitForm: NgForm;

  constructor(private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.ingredientEditSubscription = this.store.select('shoppingList').subscribe(shoppingListState => {
      if(shoppingListState.editedIngredientIndex > -1){
        this.editMode = true;
        this.ingredientEditIndex = shoppingListState.editedIngredientIndex;
        this.editedIngredient = shoppingListState.editedIngredient;
        this.ingredeitForm.setValue({ name: shoppingListState.editedIngredient.name, amount: shoppingListState.editedIngredient.amount });
      } else {
        this.editMode = false;
      }
    }

    )
    // this.ingredientEditSubscription = this.shoppingListService.ingredientEditStart.subscribe(
    //   (index: number) => {
    //     this.editMode = true;
    //     this.ingredientEditIndex = index;
    //     this.editedIngredient = this.shoppingListService.getIngredientByIndex(index);
    //     this.ingredeitForm.setValue({ name: this.editedIngredient.name, amount: this.editedIngredient.amount });
    //   }
    // );
  }

  onRecipeSubmitted(form: NgForm) {
    let ingredient = new Ingredient(
      form.value.name,
      form.value.amount,
    )
    if (this.editMode) {
      //this.shoppingListService.updateIngredient(this.ingredientEditIndex, );
      
      this.store.dispatch(new EditIngredient(ingredient));
    } else {
      this.store.dispatch(new AddIngredient(ingredient));
      //this.shoppingListService.onNewIngredient(ingredient);
    }
    this.resetForm();
  }

  ngOnDestroy(): void {
    this.ingredientEditSubscription.unsubscribe();
    this.store.dispatch(new StopEditIngredient());
  }

  resetForm() {
    this.ingredeitForm.reset();
    this.store.dispatch(new StopEditIngredient());
    this.editMode = false;
  }

  onIngredientDeleted() {
    //this.shoppingListService.deleteIngredient(this.ingredientEditIndex);
    
    this.store.dispatch(new DeleteIngredient());
    this.resetForm();
  }
}
