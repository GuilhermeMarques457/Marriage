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
import { AppState } from 'src/app/store/app.reducer';
import { selectAuthState } from '../store/auth.selector';
import { UserLogin } from '../user.login.model';
import { clearError, login, setSignUpActive } from '../store/auth.actions';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

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
