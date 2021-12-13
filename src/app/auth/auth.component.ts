import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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

  constructor(private authService: AuthService) {}
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
        console.log("next: ", data);
        this.isLoading = false;
      },
      error: (errorMessage) => {
        console.log("error: ", errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      },
    });

    this.authForm.reset();
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
