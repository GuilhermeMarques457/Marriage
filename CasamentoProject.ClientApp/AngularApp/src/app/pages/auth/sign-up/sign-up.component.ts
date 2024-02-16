import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSignUp } from '../models/user.signUp.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthState } from '../store/auth.selector';
import { setLoginActive, signUp } from '../store/auth.actions';
import { AppState } from '../../../store/app.reducer';
import { PasswordValidator } from '../../../shared/validators/password-validator';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { PhoneValidator } from '../../../shared/validators/phone-validator';
import { ErrorResponse } from '../../../shared/models/error-response.model';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { AuthErrors } from '../../../shared/components/input-field/input-validations/auth-validation';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { SharedFormsModule } from '../../../shared/modules/forms.module';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
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
export class SignUpComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<AppState>,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  private storeSubs$: Subscription;

  signupForm: FormGroup;
  isLoading = false;
  error: ErrorResponse = null;

  nameErrors = AuthErrors.nameErrors;
  passwordErrors = AuthErrors.passwordErrors;
  emailErrors = AuthErrors.emailErrors;
  phoneErrors = AuthErrors.phoneErrors;
  confirmErrors = AuthErrors.confirmErrors;

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

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
}
