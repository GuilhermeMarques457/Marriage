import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, take, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { UserSignUp } from '../user.signUp.model';
import { HttpClient } from '@angular/common/http';
import { UserAuthenticated } from '../user.authenticated.model';
import { UserLogin } from '../user.login.model';
import { Router } from '@angular/router';
import { AuthTimeoutService } from '../auth-timeout.service';
import { API_URL_AUTH } from '../../../shared/utils/api_urls';
import { ErrorResponse } from '../../../shared/utils/error-response.model';

const handleAuthentication = (resData: UserAuthenticated) => {
  localStorage.setItem('userData', JSON.stringify(resData));

  return AuthActions.authenticateSucess({ user: resData, redirect: true });
};

const handleError = (err: ErrorResponse, signUpError = false) => {
  console.log(err);
  let errorMessage = 'An unknown error occurred';

  if (!err.error)
    return of(AuthActions.authenticateFail({ error: errorMessage }));

  switch (err.error.Details) {
    case 'Invalid email or password':
      errorMessage = 'Email ou senha errados. Tente novamente!';
      break;
  }

  if (signUpError) {
    errorMessage = 'Esse email já esta em uso. Tente novamente!';
  }
  return of(AuthActions.authenticateFail({ error: errorMessage }));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authTimeoutService: AuthTimeoutService
  ) {}

  private API_BASE_URL = API_URL_AUTH;

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
            catchError((err) => handleError(err, true))
          );
      })
    )
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userDataFromLocalStorage: string | null =
          localStorage.getItem('userData');

        if (!userDataFromLocalStorage) AuthActions.logout();

        const userData: {
          email: string;
          personName: string;
          expiration: Date;
          refreshToken: string;
          refreshTokenExpirationDateTime: Date;
        } = JSON.parse(userDataFromLocalStorage);

        if (
          new Date(userData.refreshTokenExpirationDateTime).getTime() <
          new Date().getTime()
        ) {
          localStorage.removeItem('userData');
          return AuthActions.logout();
        }

        const loadedUser = new UserAuthenticated(
          userData.email,
          userData.personName,
          new Date(userData.expiration),
          userData.refreshToken,
          new Date(userData.refreshTokenExpirationDateTime)
        );

        if (!loadedUser.refreshToken) return AuthActions.logout();

        const expirationDuration =
          new Date(userData.refreshTokenExpirationDateTime).getTime() -
          new Date().getTime();

        this.authTimeoutService.setLogoutTimer(expirationDuration);

        console.log('entrou');

        return AuthActions.authenticateSucess({
          user: loadedUser,
          redirect: false,
        });
      }),
      filter((action) => Boolean(action))
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
          if (authSuccessAction.redirect) this.router.navigate(['/Home']);
        })
      ),
    { dispatch: false }
  );

  authRedirectLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap((authSuccessAction) => {
          localStorage.removeItem('userData');
          this.router.navigate(['/Auth/Login']);
        })
      ),
    { dispatch: false }
  );
}
