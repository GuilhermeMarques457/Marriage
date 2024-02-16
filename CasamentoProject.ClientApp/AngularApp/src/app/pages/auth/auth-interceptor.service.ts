import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectAuthUserAuthenticated } from './store/auth.selector';
import { AppState } from '../../store/app.reducer';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store<AppState>);
  let token: string | undefined;

  store
    .select(selectAuthUserAuthenticated)
    .pipe(take(1))
    .subscribe({
      next: (user) => {
        token = user?.token;
      },
    });

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
