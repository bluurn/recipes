import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../models/ingredient";
import { Recipe } from "../recipes/recipe.model";

@Injectable({ providedIn: "root" })
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private _recipes: Recipe[] = [
    new Recipe(
      "Bang Bang Shrimp Pasta",
      "This Bang Bang Shrimp Pasta has the most scrumptious, creamy sauce.",
      "https://www.theidearoom.net/wp-content/uploads/2017/05/bang-bang-shrimp-pasta-recipe-theidearoom-1-1.jpg",
      [new Ingredient("Shrimp", 2), new Ingredient("Pasta", 1)]
    ),
    new Recipe(
      "Dum Aloo",
      "Creamy, rich and spicy Dum Aloo recipe, golden fried baby potatoes cooked in a delicious gravy!",
      "https://i0.wp.com/cookingfromheart.com/wp-content/uploads/2017/08/Dum-Aloo-5.jpg?w=1024&ssl=1",
      [new Ingredient("Potato", 2), new Ingredient("Yogurt", 1)]
    ),
  ];
  constructor() {}

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
