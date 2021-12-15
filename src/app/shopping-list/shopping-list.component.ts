import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Ingredient } from "../recipes/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import * as fromShoppingList from "src/app/shopping-list/store/shopping-list.reducer";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList");
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
