import { Injectable } from "@angular/core";
import { Ingredient } from "../models/ingredient";

@Injectable({ providedIn: "root" })
export class ShoppingListService {
  _ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];
  constructor() {}

  get ingredients() {
    return [...this._ingredients];
  }

  add(ingredient: Ingredient) {
    this._ingredients.push(ingredient);
  }
}
