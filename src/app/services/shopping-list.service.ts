import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../models/ingredient";

@Injectable({ providedIn: "root" })
export class ShoppingListService {
  startedEditing = new Subject<number>();
  _ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];
  constructor() {}

  get ingredients() {
    return [...this._ingredients];
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  add(...ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
  }
}
