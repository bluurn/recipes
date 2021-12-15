import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/recipes/ingredient.model";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";

import * as ShoppingListActions from "../store/shopping-list.actions";
@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editedItemIndex: number = null;

  editedItem: Ingredient;

  @ViewChild("f") shoppingListForm: NgForm;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(
          this.editedItemIndex
        );
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        ingredient
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }
    this.onClear();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editedItemIndex = null;
  }

  onDelete() {
    this.shoppingListService.remove(this.editedItemIndex);
    this.onClear();
  }

  get editMode() {
    return this.editedItemIndex !== null;
  }
}
