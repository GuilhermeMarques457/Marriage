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
import { UserLogin } from '../models/user.login.model';
import { clearError, login, setSignUpActive } from '../store/auth.actions';
import { AppState } from '../../../store/app.reducer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorResponse } from '../../../shared/utils/error-response.model';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { InputError } from '../../../shared/models/input-error.model';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
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
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}

  private storeSubs$: Subscription;

  loginForm: FormGroup;
  isLoading = false;
  error: ErrorResponse = null;

  emailErrors = [
    new InputError('Email não pode ser nulo', 'required'),
    new InputError('Email deve estar no formato de email', 'email'),
  ];

  passwordErrors = [
    new InputError('Senha não pode ser nula', 'required'),
    new InputError('Senha tem que conter mais de 8 caractere', 'minLength'),
  ];

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
      });
  }

  onChangeForm() {
    this.store.dispatch(setSignUpActive());
  }

  ngOnDestroy() {
    if (this.storeSubs$) this.storeSubs$.unsubscribe();
  }

  onSubmit() {
    console.log(this.loginForm);
    if (!this.loginForm.valid) return;

    const user: UserLogin = new UserLogin(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    console.log(user);

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
