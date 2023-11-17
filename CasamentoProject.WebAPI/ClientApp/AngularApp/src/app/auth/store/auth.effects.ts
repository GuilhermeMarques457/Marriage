import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { UserSignUp } from '../user.signUp.model';
import { HttpClient } from '@angular/common/http';
import { UserAuthenticated } from '../user.authenticated.model';
import { UserLogin } from '../user.login.model';
import { Router } from '@angular/router';

const handleAuthentication = (resData) => {
  localStorage.setItem('userData', JSON.stringify(resData));

  return AuthActions.authenticateSucess({ user: resData });
};

const handleError = (err) => {
  let errorMessage = 'An unknown error occurred';

  if (!err.error || !err.error.error)
    return of(AuthActions.authenticateFail({ error: errorMessage }));

  switch (err.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email already exists';
      break;
    case 'INVALID_LOGIN_CREDENTIALS':
      errorMessage = 'Invalid email or password';
      break;
  }
  return of(AuthActions.authenticateFail({ error: errorMessage }));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  private API_BASE_URL: string = 'https://localhost:7029/api/Account';

  authSignUp = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap((signUpActions: { user: UserSignUp }) => {
        return this.http
          .post<UserAuthenticated>(
            `${this.API_BASE_URL}/Register`,
            signUpActions.user
          )
          .pipe(
            map((userAuthenticated) => handleAuthentication(userAuthenticated)),
            catchError((err) => handleError(err))
          );
      })
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((authData: { user: UserLogin }) => {
        return this.http
          .post<UserAuthenticated>(`${this.API_BASE_URL}/Login`, authData.user)
          .pipe(
            tap((res) => {
              console.log(res);
            }),
            map((resData) => handleAuthentication(resData)),

            catchError((err) => handleError(err))
          );
      })
    )
  );

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSucess),
        tap((authSuccessAction) => {
          console.log('entrou');
          this.router.navigate(['/Home']);
        })
      ),
    { dispatch: false }
  );
}
