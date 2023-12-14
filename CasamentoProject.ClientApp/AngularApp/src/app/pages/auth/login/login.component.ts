import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthState } from '../store/auth.selector';
import { UserLogin } from '../user.login.model';
import { clearError, login, setSignUpActive } from '../store/auth.actions';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { AppState } from '../../../store/app.reducer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    LoadingSpinnerComponent,
    AlertComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    // To priovide this form style globally
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'never' },
    },
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}

  private storeSubs$: Subscription;
  private alertClose$: Subscription;

  loginForm: FormGroup;
  submitted = false;
  isLoading = false;
  error: string = null;
  currentForm: boolean = true;
  // Angular material property
  hide = true;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.storeSubs$ = this.store
      .select(selectAuthState)
      .subscribe((authState) => {
        this.isLoading = authState.loading;
        this.error = authState.authError;

        // Making the form do not desapear so fast
        if (authState.formActive === 'login-active') {
          this.currentForm = true;
        } else {
          setTimeout(() => {
            this.currentForm = false;
          }, 500);
        }
      });
  }

  onChangeForm() {
    this.store.dispatch(setSignUpActive());
  }

  ngOnDestroy(): void {
    if (this.storeSubs$) this.storeSubs$.unsubscribe();
    if (this.alertClose$) this.alertClose$.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) return;

    const user: UserLogin = new UserLogin(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    this.submitted = true;

    this.store.dispatch(login({ user: user }));

    this.loginForm.reset();
  }

  resetForm() {
    this.loginForm.reset();
  }

  onHandleError() {
    this.store.dispatch(clearError());
  }
}
