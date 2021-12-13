import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "./recipe.service";

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
    return this.http.put(this.URL_BASE + "/recipes.json", recipes);
  }
}
