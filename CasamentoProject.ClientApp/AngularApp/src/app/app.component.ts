import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AppState } from './store/app.reducer';
import { autoLogin } from './pages/auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SignUpComponent,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AngularApp';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }
}
