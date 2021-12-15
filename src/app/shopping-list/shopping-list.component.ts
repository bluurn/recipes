import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Ingredient } from "../recipes/ingredient.model";
import * as fromShoppingList from "src/app/shopping-list/store/shopping-list.reducer";
import * as ShoppingListActions from "./store/shopping-list.actions";
@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(private store: Store<fromShoppingList.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList");
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
