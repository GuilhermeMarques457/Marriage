import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { UserSignUp } from '../models/user.signUp.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserAuthenticated } from '../models/user.authenticated.model';
import { UserLogin } from '../models/user.login.model';
import { Router } from '@angular/router';
import { AuthTimeoutService } from '../auth-timeout.service';
import { ErrorResponse } from '../../../shared/models/error-response.model';
import { environment } from '../../../../environments/environment.development';

const handleAuthentication = (resData: UserAuthenticated) => {
  localStorage.setItem('userData', JSON.stringify(resData));

  return AuthActions.authenticateSucess({ user: resData, redirect: true });
};

const handleError = (err: ErrorResponse, signUpError = false) => {
  let error = new ErrorResponse(
    'Um erro inesperado ocorreu',
    'Contate a central de ajuda para mais informações',
    '400'
  );

  if (!err.error) return of(AuthActions.authenticateFail({ error: error }));

  if (err.error.Details) {
    error = err;
  }

  if (signUpError) {
    error.error.Details = 'Esse email já esta em uso. Tente novamente!';
    error.error.Message = 'Email ou senha inválidos';
    error.error.StatusCode = '404';
  }

  return of(AuthActions.authenticateFail({ error: error }));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authTimeoutService: AuthTimeoutService
  ) {}

  private API_URL_BASE = `${environment.API_URL}/Account`;

  authSignUp = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap((signUpActions: { user: UserSignUp }) => {
        console.log(this.API_URL_BASE);
        return this.http
          .post<UserAuthenticated>(
            `${this.API_URL_BASE}/Register`,
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

        if (!userDataFromLocalStorage) return AuthActions.logout();

        const userData: {
          id: string;
          email: string;
          personName: string;
          token: string;
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
          userData.id,
          userData.email,
          userData.personName,
          userData.token,
          new Date(userData.expiration),
          userData.refreshToken,
          new Date(userData.refreshTokenExpirationDateTime)
        );

        if (!loadedUser.refreshToken) return AuthActions.logout();

        const expirationDuration =
          new Date(userData.refreshTokenExpirationDateTime).getTime() -
          new Date().getTime();

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
          .post<UserAuthenticated>(
            `${this.API_URL_BASE}/Login`,
            authData.user,
            {
              headers: new HttpHeaders({
                'X-Skip-Interceptor': 'true',
              }),
            }
          )
          .pipe(
            map((resData) => handleAuthentication(resData)),
            catchError((err) => handleError(err))
          );
      })
    )
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.clear();
          this.authTimeoutService.clearLogoutTimer();
        })
      ),
    { dispatch: false }
  );

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSucess),
        tap((authSuccessAction) => {
          localStorage['token'] = authSuccessAction.user.token;
          localStorage['refreshToken'] = authSuccessAction.user.refreshToken;
          if (authSuccessAction.redirect) this.router.navigate(['/casamento']);
        })
      ),
    { dispatch: false }
  );

  refreshJWTToken = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshJWTToken),
      switchMap((tokenData: { token: string; refreshToken: string }) => {
        return this.http
          .post<UserAuthenticated>(
            `${this.API_URL_BASE}/generate-new-jwt-token`,
            {
              token: tokenData.token,
              refreshToken: tokenData.refreshToken,
            },
            {
              headers: new HttpHeaders({
                'X-Skip-Interceptor': 'true',
              }),
            }
          )
          .pipe(
            tap((authSuccessAction: UserAuthenticated) => {
              localStorage['token'] = authSuccessAction.token;
              localStorage['refreshToken'] = authSuccessAction.refreshToken;
            }),
            map((resData: UserAuthenticated) => handleAuthentication(resData)),
            catchError((err: ErrorResponse) => handleError(err))
          );
      })
    )
  );

  authRedirectLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap((authSuccessAction) => {
          localStorage.removeItem('userData');
          this.router.navigate(['/Auth']);
        })
      ),
    { dispatch: false }
  );
}
