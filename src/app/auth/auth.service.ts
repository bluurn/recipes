import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}
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
        catchError((errorRes) => {
          let errorMessage = "An error occurred!";
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case "EMAIL_EXISTS":
              errorMessage = "Email exists!";
              break;
            default:
              errorMessage = "An error occurred!";
              break;
          }
          return throwError(errorMessage);
        })
      );
  }
}
