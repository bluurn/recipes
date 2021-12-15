import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { RecipeService } from "src/app/recipes/recipe.service";
import { Recipe } from "../recipe.model";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value["name"],
      this.recipeForm.value["description"],
      this.recipeForm.value["imagePath"],
      this.recipeForm.value["ingredients"]
    );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate([".."], { relativeTo: this.route });
  }

  onAddIngredient() {
    (this.recipeForm.get("ingredients") as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get("ingredients") as FormArray).removeAt(index);
  }
  onCancel() {
    this.router.navigate([".."], { relativeTo: this.route });
  }
  private initForm() {
    let recipeName = "";
    let imagePath = "";
    let description = "";
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.store
        .select("recipes")
        .pipe(
          map((recipeState) => {
            return recipeState.recipes.find((recipe, index) => {
              return index == this.id;
            });
          })
        )
        .subscribe((recipe) => {
          recipeName = recipe.name;
          imagePath = recipe.imagePath;
          description = recipe.description;
          if (recipe.ingredients) {
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/),
                  ]),
                })
              );
            }
          }
        });
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: recipeIngredients,
    });
  }
  get controls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }
}
