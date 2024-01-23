import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, exhaustMap, of, switchMap, take } from 'rxjs';
import {
  selectAuthState,
  selectAuthTimerIsActive,
  selectAuthUserAuthenticated,
} from './store/auth.selector';
import { AppState } from '../../store/app.reducer';
import { refreshJWTToken } from './store/auth.actions';
import { UserAuthenticated } from './models/user.authenticated.model';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.has('X-Skip-Interceptor')) {
      return next.handle(req);
    }

    return this.store.select(selectAuthUserAuthenticated).pipe(
      take(1),
      exhaustMap((user: UserAuthenticated) => {
        if (!user) return next.handle(req);

        const refreshToken = localStorage['refreshToken'];
        const token = localStorage['token'];

        return of(
          this.store.dispatch(
            refreshJWTToken({
              token: token,
              refreshToken: refreshToken,
            })
          )
        ).pipe(
          catchError(() => of(null)),
          switchMap((data) => {
            const newRefreshToken = localStorage['refreshToken'];
            const newToken = localStorage['token'];
            const userData = JSON.parse(localStorage['userData']);

            const modifiedRequest = req.clone({
              params: new HttpParams().set('auth', newRefreshToken),
              headers: req.headers.set('Authorization', `Bearer ${newToken}`),
            });

            this.store.select(selectAuthState).subscribe({
              next: (authState) => {
                if (!authState.timeOutIsActive && authState.userAuthenticated)
                  this.store.dispatch(
                    AuthActions.setTimoutToLogout({
                      dateToLogout: userData.refreshTokenExpirationDateTime,
                      timerIsActive: true,
                    })
                  );

                return next.handle(modifiedRequest);
              },
            });

            return next.handle(modifiedRequest);
          })
        );
      })
    );
  }
}
