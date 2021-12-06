import { Component, OnInit } from "@angular/core";
import { Ingredient } from "../models/ingredient";
import { ShoppingListService } from "../services/shopping-list";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
})
export class ShoppingListComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  get ingredients() {
    return this.shoppingListService.ingredients;
  }
}
