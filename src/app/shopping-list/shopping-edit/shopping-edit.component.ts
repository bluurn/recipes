import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Ingredient } from "src/app/models/ingredient";
import { ShoppingListService } from "src/app/services/shopping-list";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput") nameInputRef: ElementRef<HTMLInputElement>;
  @ViewChild("amountInput") amountInputRef: ElementRef<HTMLInputElement>;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onAddClick() {
    const name = this.nameInputRef.nativeElement.value;
    const amount = Number(this.amountInputRef.nativeElement.value);
    this.shoppingListService.add(new Ingredient(name, amount));
  }
}
