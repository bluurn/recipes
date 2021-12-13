import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../models/ingredient";
import { Recipe } from "../recipes/recipe.model";

@Injectable({ providedIn: "root" })
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private _recipes: Recipe[] = [];
  constructor() {}

  setRecipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.recipesChanged.next([...this._recipes]);
  }
  getRecipes() {
    return [...this._recipes];
  }

  getRecipe(id: number) {
    return this._recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this._recipes.push(recipe);
    this.recipesChanged.next([...this._recipes]);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this._recipes[index] = recipe;
    this.recipesChanged.next([...this._recipes]);
  }

  deleteRecipe(index: number) {
    this._recipes.splice(index, 1);
    this.recipesChanged.next([...this._recipes]);
  }
}
