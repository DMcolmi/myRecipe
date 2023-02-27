import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() showRecipes = new EventEmitter<boolean>();


  collapsed = true;
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  onShowShoppingList() {
   this.showRecipes.emit(false);
  }
  onShowRecipes() {
    this.showRecipes.emit(true);
  }
}
