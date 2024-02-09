import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { MatDialog } from '@angular/material/dialog';
import { AlertErrorComponent } from '../../shared/components/alerts/alert-error/alert-error.component';
import { ErrorResponse } from '../../shared/models/error-response.model';
import { SharedModule } from '../../shared/modules/shared.module';
import { MaterialModule } from '../../shared/modules/material.module';

@Component({
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    RouterModule,
    SignUpComponent,
    AlertErrorComponent,
    LoginComponent,
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
          this.dialog.open(AlertErrorComponent, {
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
