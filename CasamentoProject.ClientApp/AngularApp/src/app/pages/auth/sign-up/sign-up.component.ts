import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserSignUp } from '../models/user.signUp.model';
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
import { AppState } from '../../../store/app.reducer';
import { PasswordValidator } from '../../../shared/validators/password-validator';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PhoneValidator } from '../../../shared/validators/phone-validator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorResponse } from '../../../shared/utils/error-response.model';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { InputError } from '../../../shared/models/input-error.model';
import { AuthErrors } from '../../../shared/components/input-field/auth-validation';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    InputFieldComponent,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'never' },
    },
  ],
})
export class SignUpComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}

  private storeSubs$: Subscription;

  signupForm: FormGroup;
  isLoading = false;
  error: ErrorResponse = null;

  nameErrors = AuthErrors.nameErrors;
  passwordErrors = AuthErrors.passwordErrors;
  emailErrors = AuthErrors.emailErrors;
  phoneErrors = AuthErrors.phoneErrors;
  confirmErrors = AuthErrors.confirmErrors;

  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        personName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        phone: new FormControl(null, [
          Validators.required,
          PhoneValidator.validate,
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          PasswordValidator.validate,
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      { validators: [PasswordValidator.comparePasswords] }
    );

    this.storeSubs$ = this.store
      .select(selectAuthState)
      .subscribe((authState) => {
        this.isLoading = authState.loading;
      });
  }

  onChangeForm() {
    this.store.dispatch(setLoginActive());
  }

  ngOnDestroy(): void {
    if (this.storeSubs$) this.storeSubs$.unsubscribe();
  }

  onSubmit() {
    if (!this.signupForm.valid) return;

    const user: UserSignUp = new UserSignUp(
      this.signupForm.value.personName,
      this.signupForm.value.email,
      this.signupForm.value.phone,
      this.signupForm.value.password,
      this.signupForm.value.confirmPassword
    );

    this.store.dispatch(signUp({ user: user }));
  }

  resetForm() {
    this.signupForm.reset();
  }

  onHandleError() {
    this.store.dispatch(clearError());
  }
}
