import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppState } from './store/app.reducer';
import { Store } from '@ngrx/store';
import { autoLogin } from './auth/store/auth.actions';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SignUpComponent,
    LoginComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'AngularApp';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }
}
