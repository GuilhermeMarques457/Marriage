import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthState } from './store/auth.selector';
import { AppState } from '../../store/app.reducer';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { ErrorResponse } from '../../shared/utils/error-response.model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SignUpComponent,
    AlertComponent,
    LoginComponent,
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    MatButtonModule,
  ],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('formState', [
      state('login-active', style({ left: '0%' })),
      state('sign-up-active', style({ left: '50%' })),
      transition(
        'login-active <=> sign-up-active',
        animate('500ms ease-in-out')
      ),
    ]),
  ],
})
export class AuthComponent implements OnInit {
  state = 'login-active';
  stateSubs$: Subscription;
  currentForm = 'login-active';

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.stateSubs$ = this.store
      .select(selectAuthState)
      .subscribe((authState) => {
        setTimeout(() => {
          this.currentForm = authState.formActive;
        }, 250);

        this.state = authState.formActive;

        if (authState.authError) {
          this.dialog.open(AlertComponent, {
            data: new ErrorResponse(
              authState.authError.error.Message,
              authState.authError.error.Details,
              authState.authError.error.StatusCode
            ),
            exitAnimationDuration: '300ms',
            enterAnimationDuration: '300ms',
          });
        }
      });
  }
}
