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
import { signUp } from '../store/auth.actions';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class SignUpComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>) {}

  private storeSubs$: Subscription;

  signupForm: FormGroup;
  submitted = false;
  isLoading = false;
  error: string = null;

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
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.storeSubs$ = this.store
      .select(selectAuthState)
      .subscribe((authState) => {
        this.isLoading = authState.loading;
        this.error = authState.authError;

        // if (this.error) this.showErrorAlert(this.error);
      });
  }

  ngOnDestroy(): void {
    if (this.storeSubs$) this.storeSubs$.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;

    if (!this.signupForm.valid) return;

    console.log('passou');

    console.log(this.signupForm.value);

    const user: UserSignUp = new UserSignUp(
      this.signupForm.value.personName,
      this.signupForm.value.email,
      this.signupForm.value.phone,
      this.signupForm.value.password,
      this.signupForm.value.confirmPassword
    );

    console.log(user);

    this.submitted = true;

    this.store.dispatch(signUp({ user: user }));

    this.signupForm.reset();
  }

  resetForm() {
    this.signupForm.reset();
  }
}
