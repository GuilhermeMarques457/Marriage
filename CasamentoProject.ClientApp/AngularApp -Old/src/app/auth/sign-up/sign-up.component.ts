import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserSignUp } from '../user.signUp.model';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthState } from '../store/auth.selector';
import {
  clearError,
  setLoginActive,
  setSignUpActive,
  signUp,
} from '../store/auth.actions';
import { RouterModule } from '@angular/router';
import { PasswordValidator } from 'src/app/shared/validators/password-validator';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    LoadingSpinnerComponent,
    AlertComponent,
  ],
})
export class SignUpComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}

  private storeSubs$: Subscription;
  private alertClose$: Subscription;

  signupForm: FormGroup;
  submitted = false;
  isLoading = false;
  error: string = null;
  currentForm: boolean = false;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      personName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        PasswordValidator.validate,
      ]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });

    this.storeSubs$ = this.store
      .select(selectAuthState)
      .subscribe((authState) => {
        this.isLoading = authState.loading;
        this.error = authState.authError;

        if (authState.formActive === 'sign-up-active') {
          this.currentForm = true;
        } else {
          setTimeout(() => {
            this.currentForm = false;
          }, 500);
        }
      });
  }

  onChangeForm() {
    this.store.dispatch(setLoginActive());
  }

  ngOnDestroy(): void {
    if (this.storeSubs$) this.storeSubs$.unsubscribe();
    if (this.alertClose$) this.alertClose$.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (!this.signupForm.valid) return;

    const user: UserSignUp = new UserSignUp(
      this.signupForm.value.personName,
      this.signupForm.value.email,
      this.signupForm.value.phone,
      this.signupForm.value.password,
      this.signupForm.value.confirmPassword
    );

    this.submitted = true;

    this.store.dispatch(signUp({ user: user }));
  }

  resetForm() {
    this.signupForm.reset();
  }

  onHandleError() {
    this.store.dispatch(clearError());
  }
}
