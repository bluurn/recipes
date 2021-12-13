import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  userSubject = new Subject<User>();
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhk3Q-w1wM9g2kN4BlhjnW33vDBmBYVRs",
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handleError));
  }
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhk3Q-w1wM9g2kN4BlhjnW33vDBmBYVRs",
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(
      new Date().getTime() + Number(expiresIn) * 1000
    );
    const user = new User(email, userId, token, expirationDate);
    this.userSubject.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
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
    return throwError(() => errorMessage);
  }
}
