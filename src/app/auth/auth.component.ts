import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";
import { Subscription } from "rxjs";
import { ShoppingEditComponent } from "../shopping-list/shopping-edit/shopping-edit.component";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit, OnDestroy {
  storeSub: Subscription;
  authForm: FormGroup;
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  get isSignupMode() {
    return !this.isLoginMode;
  }

  constructor(private store: Store<fromApp.AppState>) {}
  ngOnDestroy(): void {
    if (this.storeSub) this.storeSub.unsubscribe();
  }
  ngOnInit(): void {
    this.storeSub = this.store.select("auth").subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
    this.initForm();
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) return;

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    if (this.isSignupMode) {
      this.store.dispatch(new AuthActions.SignupStart({ email, password }));
    } else {
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    }
    this.authForm.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }
  private initForm() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
}
