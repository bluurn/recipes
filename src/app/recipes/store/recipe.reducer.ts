import { Recipe } from "../recipe.model";

import * as RecipesActions from "./recipe.actions";

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipeReducer(
  state: State = initialState,
  action: RecipesActions.RecipesActions
): State {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case RecipesActions.UPDATE_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes.map((recipe, index) =>
            index === action.payload.index ? action.payload.newRecipe : recipe
          ),
        ],
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: [
          ...state.recipes.filter((_recipe, index) => index !== action.payload),
        ],
      };
    default:
      return state;
  }
}
