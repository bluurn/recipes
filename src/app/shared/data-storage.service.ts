import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as RecipesActions from "../recipes/store/recipe.actions";

@Injectable({ providedIn: "root" })
export class DataStorageService {
  URL_BASE =
    "https://recipe-book-6a4d2-default-rtdb.europe-west1.firebasedatabase.app";
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private store: Store<fromApp.AppState>
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
      tap((recipes) =>
        this.store.dispatch(new RecipesActions.SetRecipes(recipes))
      )
    );
  }
}
