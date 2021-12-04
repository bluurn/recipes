import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Ingredient } from "src/app/models/ingredient";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput") nameInputRef: ElementRef<HTMLInputElement>;
  @ViewChild("amountInput") amountInputRef: ElementRef<HTMLInputElement>;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() {}

  ngOnInit(): void {}

  onAddClick() {
    const name = this.nameInputRef.nativeElement.value;
    const amount = Number(this.amountInputRef.nativeElement.value);
    this.ingredientAdded.emit(new Ingredient(name, amount));
  }
}
