import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs";
import { Recipe } from "../recipe.model";
import * as RecipesActions from "./recipe.actions";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { environment } from "src/environments/environment";

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(environment.apiURL + "/recipes.json");
    }),
    map((recipes) =>
      recipes.map((recipe) => ({
        ...recipe,
        ingredients: recipe.ingredients ? recipe.ingredients : [],
      }))
    ),
    map((recipes) => new RecipesActions.SetRecipes(recipes))
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select("recipes")),
    switchMap(([, recipesState]) => {
      return this.http.put<Recipe[]>(
        environment.apiURL + "/recipes.json",
        recipesState.recipes
      );
    })
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
