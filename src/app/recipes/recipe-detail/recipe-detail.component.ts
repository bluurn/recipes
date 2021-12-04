import { Component, Input, OnInit } from "@angular/core";
import { ShoppingListService } from "src/app/services/shopping-list";
import { Recipe } from "../recipe.model";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  toShoppingList(): void {
    this.shoppingListService.add(...this.recipe.ingredients);
  }
}
