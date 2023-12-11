import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, exhaustMap, take } from 'rxjs';
import { selectAuthUserAuthenticated } from './store/auth.selector';
import { AppState } from '../../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectAuthUserAuthenticated).pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) return next.handle(req);

        const modifiedRequest = req.clone({
          params: new HttpParams().set('auth', user.refreshToken),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
