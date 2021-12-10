import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { RecipeService } from "src/app/services/recipe.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipe-edit.component.html",
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }
  private initForm() {
    let recipeName = "";
    let imagePath = "";
    let description = "";
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(imagePath),
      description: new FormControl(description),
    });
  }
}
