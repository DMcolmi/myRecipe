import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-recipe';

  showRecipes: boolean = true;

  onHeaderSelected(showRecipesEvent: boolean) {
   this.showRecipes = showRecipesEvent;
  }

}
