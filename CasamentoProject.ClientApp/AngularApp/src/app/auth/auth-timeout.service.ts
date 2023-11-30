import { Injectable } from '@angular/core';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { logout } from './store/auth.actions';

@Injectable()
export class AuthTimeoutService {
  private tokenExpirationTimer: any;

  constructor(private store: Store<AppState>) {}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
