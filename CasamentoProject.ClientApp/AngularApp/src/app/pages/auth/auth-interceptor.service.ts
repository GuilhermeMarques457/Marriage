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
import {
  Observable,
  catchError,
  exhaustMap,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { selectAuthUserAuthenticated } from './store/auth.selector';
import { AppState } from '../../store/app.reducer';
import { environment } from '../../../environments/environment';
import { refreshJWTToken } from './store/auth.actions';
import { UserAuthenticated } from './models/user.authenticated.model';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>, private httpClient: HttpClient) {}

  private API_URL_BASE = `${environment.API_URL}/Account`;

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

            const modifiedRequest = req.clone({
              params: new HttpParams().set('auth', newRefreshToken),
              headers: req.headers.set('Authorization', `Bearer ${newToken}`),
            });

            return next.handle(modifiedRequest);
          })
        );
      })
    );
  }
}
