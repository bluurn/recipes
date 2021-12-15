import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { environment } from "src/environments/environment";
import * as AuthActions from "./auth.actions";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (resData: AuthResponseData) => {
  const expirationDate = new Date(
    new Date().getTime() + Number(resData.expiresIn) * 1000
  );
  return new AuthActions.AuthSuccess({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expirationDate,
  });
};

const handleError = (errorRes: { error?: { error?: { message: string } } }) => {
  let errorMessage = "An unknown error occurred!";
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case "EMAIL_EXISTS":
      errorMessage = "Email exists!";
      break;
    case "INVALID_PASSWORD":
      errorMessage = "Invalid password";
      break;
    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      errorMessage = "Too many login attempts, try logging in later";
      break;
    default:
      errorMessage = "Unhandled error: " + errorRes.error.error.message;
      break;
  }
  return of(new AuthActions.AuthFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            environment.firebaseApiKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(map(handleAuthentication), catchError(handleError));
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
            environment.firebaseApiKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(map(handleAuthentication), catchError(handleError));
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTH_SUCCESS),
    tap(() => {
      this.router.navigate(["/"]);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
