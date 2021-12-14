import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "src/app/recipes/recipe.service";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";
import { Recipe } from "../recipe.model";

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
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  toShoppingList(): void {
    this.shoppingListService.add(...this.recipe.ingredients);
  }

  onEditRecipe(): void {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate([".."], { relativeTo: this.route });
  }
}
