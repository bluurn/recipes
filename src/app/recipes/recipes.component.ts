import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../services/recipe";
import { Recipe } from "./recipe.model";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(
      (recipe) => (this.selectedRecipe = recipe)
    );
  }
}
