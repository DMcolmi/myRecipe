import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredientEditSubscription = this.shoppingListService.ingredientEditStart.subscribe(
      (index: number) => {
        this.editMode = true;
        this.ingredientEditIndex = index;
        this.editedIngredient = this.shoppingListService.getIngredientByIndex(index);
        this.ingredeitForm.setValue({ name: this.editedIngredient.name, amount: this.editedIngredient.amount });
      }
    );
  }

  onRecipeSubmitted(form: NgForm) {
    let ingredient = new Ingredient(
      form.value.name,
      form.value.amount,
    )
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.ingredientEditIndex, ingredient);
    } else {
      this.shoppingListService.onNewIngredient(ingredient);
    }
    this.resetForm();
  }

  ngOnDestroy(): void {
    this.ingredientEditSubscription.unsubscribe();
  }

  resetForm(){
    this.ingredeitForm.reset();
    this.editMode = false;
  }

  onIngredientDeleted(){
    this.shoppingListService.deleteIngredient(this.ingredientEditIndex);
    this.resetForm();
  }
}
