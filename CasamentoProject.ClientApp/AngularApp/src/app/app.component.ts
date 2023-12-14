import { Component, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
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
  title = 'AngularApp';

  menuItems = [
    {
      link: '/dashboard',
      icon: 'fa-chart-line',
      label: 'Dashboard',
    },
    {
      link: '/courses',
      icon: 'fa-graduation-cap',
      label: 'Courses',
    },
    {
      link: '/teachers',
      icon: 'fa-person-chalkboard',
      label: 'Teachers',
    },
    {
      link: '/students',
      icon: 'fa-chalkboard-user',
      label: 'Students',
    },
    {
      link: '/support',
      icon: 'fa-headset',
      label: 'Support',
    },
  ];

  isDark = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }

  @HostBinding('class') get themeMode() {
    return this.isDark ? 'theme-dark' : 'theme-light';
  }

  changeTheme() {
    this.isDark = !this.isDark;
    console.log(this.isDark);
  }
}
