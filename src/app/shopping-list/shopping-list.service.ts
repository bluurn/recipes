import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../recipes/ingredient.model";

@Injectable({ providedIn: "root" })
export class ShoppingListService {
  startedEditing = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();
  private _ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];
  constructor() {}

  getIngredients() {
    return [...this._ingredients];
  }

  getIngredient(index: number) {
    return this._ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this._ingredients[index] = newIngredient;
    this.ingredientsChanged.next([...this._ingredients]);
  }

  add(...ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next([...this._ingredients]);
  }

  remove(index: number) {
    this._ingredients.splice(index, 1);
    this.ingredientsChanged.next([...this._ingredients]);
  }
}
