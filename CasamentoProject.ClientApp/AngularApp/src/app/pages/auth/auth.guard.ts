import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, map, take, tap } from 'rxjs';
import { selectAuthUserAuthenticated } from './store/auth.selector';
import { AppState } from '../../store/app.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(selectAuthUserAuthenticated).pipe(
      take(1),
      map((user) => {
        const isAuth = user ? true : false;

        return isAuth ? true : this.router.createUrlTree(['/Auth']);
      })
    );
  }
}
