import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "./recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  URL_BASE =
    "https://recipe-book-6a4d2-default-rtdb.europe-west1.firebasedatabase.app";
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    return this.http
      .put<Recipe[]>(this.URL_BASE + "/recipes.json", recipes)
      .subscribe();
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.URL_BASE + "/recipes.json").pipe(
      map((recipes) =>
        recipes.map((recipe) => ({
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        }))
      ),
      tap((recipes) => this.recipesService.setRecipes(recipes))
    );
  }
}
