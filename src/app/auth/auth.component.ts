import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isLoginMode = true;

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

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    if (this.isSignupMode) {
      this.authService.signup(email, password).subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
    }
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
