import { Component, HostBinding } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { AppState } from './store/app.reducer';
import { autoLogin, logout } from './pages/auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import {
  selectAuthState,
  selectAuthUserAuthenticated,
} from './pages/auth/store/auth.selector';
import { Subscription, filter, map } from 'rxjs';
import { UserAuthenticated } from './pages/auth/models/user.authenticated.model';
import { setInputIsDisable } from './shared/store/usefull.actions';
import { SharedModule } from './shared/modules/shared.module';
import { MaterialModule } from './shared/modules/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule,
    SignUpComponent,
    LoginComponent,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  userAuthenticatedSubs$: Subscription = null;
  userAuthenticated: UserAuthenticated = null;
  title = 'AngularApp';
  currentMenuItem;

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

    this.store.select(selectAuthUserAuthenticated).subscribe({
      next: (user) => {
        this.userAuthenticated = user;
      },
    });

    // Take Page title
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd)
      )
      .subscribe(() => {
        this.currentMenuItem = this.menuItems.find(
          (r) =>
            r.link.replace('/', '') ==
            this.route.firstChild?.snapshot.routeConfig?.path
        );
      });
  }

  @HostBinding('class') get themeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light';
  }

  onLogout() {
    this.store.dispatch(logout());
    this.store.dispatch(setInputIsDisable({ isDisabled: false }));
  }

  changeTheme() {
    this.isDark = !this.isDark;
  }
}
