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
import { Observable, exhaustMap, switchMap, take, tap } from 'rxjs';
import { selectAuthUserAuthenticated } from './store/auth.selector';
import { AppState } from '../../store/app.reducer';
import { environment } from '../../../environments/environment';
import { refreshJWTToken } from './store/auth.actions';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>, private httpClient: HttpClient) {}

  private API_URL_BASE = `${environment.API_URL}/Account`;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectAuthUserAuthenticated).pipe(
      take(1),
      switchMap(() => {
        const refreshToken = localStorage['refreshToken'];
        const token = localStorage['token'];

        return this.httpClient
          .post<any>(`${this.API_URL_BASE}/generate-new-jwt-token`, {
            token: token,
            refreshToken: refreshToken,
          })
          .pipe(
            tap((newToken) => {
              // return refreshJWTToken({ token, refreshToken });
            })
          );
      }),
      exhaustMap((user) => {
        if (!user) return next.handle(req);

        const modifiedRequest = req.clone({
          params: new HttpParams().set('auth', user.refreshToken),
          headers: req.headers.set('Authorization', `Bearer ${user.token}`),
        });

        return next.handle(modifiedRequest);
      })
    );
  }
}
