import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { RecipeService } from "src/app/recipes/recipe.service";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";
import { Ingredient } from "../ingredient.model";
import { Recipe } from "../recipe.model";

import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import * as fromShoppingList from "src/app/shopping-list/store/shopping-list.reducer";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.recipe = this.recipeService.getRecipe(this.id);
    });
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
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate([".."], { relativeTo: this.route });
  }
}
