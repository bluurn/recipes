import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing.module";
import { DropdownDirective } from "./shared/dropdown.directive";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { AuthComponent } from "./auth/auth.component";
import { LoadingSpinnerComponent } from "./shared/loading-spinner/loading-spinner.component";
import { AuthInterceptor } from "./auth/auth-interceptor.service";
import { AlertComponent } from "./shared/alert/alert.component";
import { RecipesModule } from "./recipes/recipes.module";

@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    AuthComponent,
    HeaderComponent,
    LoadingSpinnerComponent,

    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
