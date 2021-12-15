import { Ingredient } from "../../recipes/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
): State {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients.map((ingredient, index) =>
            index === state.editedIngredientIndex ? action.payload : ingredient
          ),
        ],
        editedIngredientIndex: -1,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((_ingredient, index) => {
          return index != state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {
          ...state.ingredients[action.payload],
        },
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    default:
      return state;
  }
}
