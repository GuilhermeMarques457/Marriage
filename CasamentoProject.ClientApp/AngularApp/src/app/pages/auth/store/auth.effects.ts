import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { UserSignUp } from '../models/user.signUp.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAuthenticated } from '../models/user.authenticated.model';
import { UserLogin } from '../models/user.login.model';
import { Router } from '@angular/router';
import { ErrorResponse } from '../../../shared/models/error-response.model';
import { environment } from '../../../../environments/environment';

const handleAuthentication = (resData: UserAuthenticated) => {
  localStorage.setItem('userData', JSON.stringify(resData));
  localStorage.setItem('token', resData.token);
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
    private router: Router // private authTimeoutService: AuthTimeoutService
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

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((authData: { user: UserLogin }) => {
        return this.http
          .post<UserAuthenticated>(`${this.API_URL_BASE}/Login`, authData.user)
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
        })
      ),
    { dispatch: false }
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

        const loadedUser = new UserAuthenticated(
          userData.id,
          userData.email,
          userData.personName,
          userData.token
        );

        return AuthActions.authenticateSucess({
          user: loadedUser,
          redirect: false,
        });
      }),
      filter((action) => Boolean(action))
    )
  );

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticateSucess),
        tap((authSuccessAction) => {
          if (authSuccessAction.redirect) this.router.navigate(['/casamento']);
        })
      ),
    { dispatch: false }
  );

  authRedirectLogout = createEffect(
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
