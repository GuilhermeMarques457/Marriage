import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { AppState } from './store/app.reducer';
import { autoLogin, logout } from './pages/auth/store/auth.actions';
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
import {
  selectAuthTimer,
  selectAuthUserAuthenticated,
} from './pages/auth/store/auth.selector';
import { BehaviorSubject, Subscription, filter, map, take, tap } from 'rxjs';
import { UserAuthenticated } from './pages/auth/models/user.authenticated.model';
// import { AuthTimeoutService } from './pages/auth/auth-timeout.service';
import { setInputIsDisable } from './shared/store/usefull.actions';

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
  formattedTimeToLogout: string | null = null;
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
    private router: Router // private authTimeoutService: AuthTimeoutService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(autoLogin());

    this.store.select(selectAuthTimer).subscribe({
      next: (time) => {
        this.formattedTimeToLogout = time;
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
    this.formattedTimeToLogout = null;
  }

  changeTheme() {
    this.isDark = !this.isDark;
  }
}
