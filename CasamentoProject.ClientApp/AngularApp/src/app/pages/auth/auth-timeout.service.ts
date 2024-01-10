import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from './store/auth.actions';
import { AppState } from '../../store/app.reducer';
import { selectAuthUserAuthenticated } from './store/auth.selector';
import { UserAuthenticated } from './models/user.authenticated.model';
import { BehaviorSubject, Subject, delay, filter, take, takeUntil } from 'rxjs';

@Injectable()
export class AuthTimeoutService {
  public formattedTimeToLogout = new BehaviorSubject<string>(null);
  private destroy$ = new Subject<void>();
  private logoutTimer;

  constructor(private store: Store<AppState>) {
    this.store
      .select(selectAuthUserAuthenticated)
      .pipe(
        filter((user: UserAuthenticated) => user !== null),
        takeUntil(this.destroy$) // Filtra usuários não nulos
      )
      .subscribe((user: UserAuthenticated) => {
        console.log('usuario autenticado kaakakka');
        this.timeOutToLogout(user.refreshTokenExpirationDateTime);
      });
  }

  private timeOutToLogout(userExpirationDateTime) {
    const expirationTimestamp: number = new Date(
      userExpirationDateTime
    ).getTime();

    const currentTime: number = new Date().getTime();

    const secondsLogout = Math.floor(
      (expirationTimestamp - currentTime) / 1000
    );

    this.setIntervalToLogout(secondsLogout);
  }

  private setIntervalToLogout(secondsLogout) {
    let secondsLog = secondsLogout;

    this.logoutTimer = setInterval(() => {
      secondsLog--;
      const minutes = Math.floor(secondsLog / 60);
      const seconds = secondsLog % 60;

      console.log(`${minutes}min ${seconds}s`);

      this.formattedTimeToLogout.next(`${minutes}min ${seconds}s`);

      if (secondsLog === 0) this.store.dispatch(logout());
    }, 1000);
  }

  public clearLogoutTimer() {
    clearInterval(this.logoutTimer);
    this.formattedTimeToLogout.next(null);
    this.formattedTimeToLogout.complete();
  }
}
