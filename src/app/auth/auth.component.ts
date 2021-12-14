import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isLoginMode = true;

  isLoading = false;

  error: string = null;
  get isSignupMode() {
    return !this.isLoginMode;
  }

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.initForm();
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) return;
    this.isLoading = true;

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObservable: Observable<AuthResponseData>;

    if (this.isSignupMode) {
      authObservable = this.authService.signup(email, password);
    } else {
      authObservable = this.authService.login(email, password);
    }
    authObservable.subscribe({
      next: (data) => {
        this.isLoading = false;
        this.router.navigate(["/recipes"]);
      },
      error: (errorMessage) => {
        console.log("error: ", errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      },
    });

    this.authForm.reset();
  }

  onHandleError() {
    this.error = null;
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
