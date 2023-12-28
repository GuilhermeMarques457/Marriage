import { Component, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { AppState } from './store/app.reducer';
import { autoLogin } from './pages/auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { selectAuthUserAuthenticated } from './pages/auth/store/auth.selector';
import { Subscription, filter, map } from 'rxjs';
import { UserAuthenticated } from './pages/auth/models/user.authenticated.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SignUpComponent,
    LoginComponent,
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  userAuthenticatedSubs$: Subscription = null;
  userAuthenticated: UserAuthenticated = null;
  formattedTimeToLogout: string = null;
  title = 'AngularApp';
  pageTitle = '';
  pageIcon = '';

  menuItems = [
    {
      link: '/index',
      icon: 'home',
      label: 'Geral',
    },
    {
      link: '/casamento',
      icon: 'church',
      label: 'Casamento',
    },
    {
      link: '/presentes',
      icon: 'redeem',
      label: 'Presentes',
    },
    {
      link: '/convidados',
      icon: 'groups',
      label: 'Convidados',
    },
  ];

  isDark = false;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
    this.userAuthenticatedSubs$ = this.store
      .select(selectAuthUserAuthenticated)
      .subscribe((user) => {
        if (user) {
          this.userAuthenticated = user;
          this.timeOutToLogout(user.refreshTokenExpirationDateTime);
        }
      });

    // Take Page title
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd)
      )
      .subscribe(() => {
        const currentMenuItem = this.menuItems.find(
          (r) =>
            r.link.replace('/', '') ==
            this.route.firstChild?.snapshot.routeConfig?.path
        );
        this.pageTitle = currentMenuItem.label;
        this.pageIcon = currentMenuItem.icon;
      });
  }

  @HostBinding('class') get themeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light';
  }

  timeOutToLogout(userExpirationDateTime) {
    const expirationTimestamp: number = new Date(
      userExpirationDateTime
    ).getTime();

    const currentTime: number = new Date().getTime();

    const secondsLogout = Math.floor(
      (expirationTimestamp - currentTime) / 1000
    );

    this.setIntervalToLogout(secondsLogout);
  }

  setIntervalToLogout(secondsLogout) {
    let secondsLog = secondsLogout;
    setInterval(() => {
      secondsLog--;
      const minutes = Math.floor(secondsLog / 60);
      const seconds = secondsLog % 60;

      this.formattedTimeToLogout = `${minutes}min ${seconds}s`;

      if (secondsLog === 0) this.formattedTimeToLogout = null;
    }, 1000);
  }

  changeTheme() {
    this.isDark = !this.isDark;
    console.log(this.isDark);
  }
}
