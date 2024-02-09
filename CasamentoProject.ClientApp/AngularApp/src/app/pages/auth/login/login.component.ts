import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthState } from '../store/auth.selector';
import { UserLogin } from '../models/user.login.model';
import { login, setSignUpActive } from '../store/auth.actions';
import { AppState } from '../../../store/app.reducer';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ErrorResponse } from '../../../shared/models/error-response.model';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { AuthErrors } from '../../../shared/components/input-field/input-validations/auth-validation';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { SharedFormsModule } from '../../../shared/modules/forms.module';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    SharedModule,
    SharedFormsModule,
    MaterialModule,
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
  emailErrors = AuthErrors.emailErrors;
  passwordErrors = AuthErrors.passwordErrors;

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
    if (!this.loginForm.valid) return;

    const user: UserLogin = new UserLogin(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    this.store.dispatch(login({ user: user }));

    this.loginForm.reset();
  }

  resetForm() {
    this.loginForm.reset();
  }
}
