import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap } from "rxjs";
import { Recipe } from "../recipe.model";
import * as RecipesActions from "./recipe.actions";

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipies = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        "https://recipe-book-6a4d2-default-rtdb.europe-west1.firebasedatabase.app/recipes.json"
      );
    }),
    map((recipes) =>
      recipes.map((recipe) => ({
        ...recipe,
        ingredients: recipe.ingredients ? recipe.ingredients : [],
      }))
    ),
    map((recipes) => new RecipesActions.SetRecipes(recipes))
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
