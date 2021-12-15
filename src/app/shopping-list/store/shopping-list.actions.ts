import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/recipes/ingredient.model";
export const ADD_INGREDIENT = "SHOPPING_LIST::ADD_INGREDIENT";
export const ADD_INGREDIENTS = "SHOPPING_LIST::ADD_INGREDIENTS";
export const UPDATE_INGREDIENT = "SHOPPING_LIST::UPDATE_INGREDIENT ";
export const DELETE_INGREDIENT = "SHOPPING_LIST::DELETE_INGREDIENT ";
export const START_EDIT = "SHOPPING_LIST::START_EDIT";
export const STOP_EDIT = "SHOPPING_LIST::STOP_EDIT";

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {}
}
export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;
  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
