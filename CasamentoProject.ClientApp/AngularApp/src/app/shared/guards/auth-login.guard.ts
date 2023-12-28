import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import { AppState } from '../../store/app.reducer';
import { selectAuthUserAuthenticated } from '../../pages/auth/store/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardLogin implements CanActivate {
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

        return isAuth ? this.router.createUrlTree(['/casamento']) : true;
      })
    );
  }
}
