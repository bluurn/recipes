import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Recipe } from "../recipe.model";

import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import * as RecipesActions from "../store/recipe.actions";
import * as fromApp from "../../store/app.reducer";
import { map, switchMap } from "rxjs";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          return +params.id;
        }),
        switchMap((id) => {
          this.id = id;
          return this.store.select("recipes");
        }),
        map((recipesState) => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe((recipe) => (this.recipe = recipe));
  }

  toShoppingList(): void {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
  }

  onEditRecipe(): void {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate([".."], { relativeTo: this.route });
  }
}
