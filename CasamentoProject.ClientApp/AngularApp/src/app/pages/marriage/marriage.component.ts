import { Component } from '@angular/core';
import { Marriage } from './marriage.model';
import { Store } from '@ngrx/store';
import {
  addMarriage,
  clearError,
  getMarriage,
  getMarriageByUserId,
  getMarriages,
} from './store/marriage.actions';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { TransformHourToCorrectFormat } from '../../shared/utils/hour-transformer';
import { AppState } from '../../store/app.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import { MarriageErrors } from '../../shared/components/input-field/input-validations/marriage-validation';
import { MatButtonModule } from '@angular/material/button';
import { BtnCrazyGradientComponent } from '../../shared/components/btn-crazy-gradient/btn-crazy-gradient.component';
import { DatePickerComponent } from '../../shared/components/date-picker/date-picker.component';
import {
  selectAuthState,
  selectAuthUserAuthenticated,
} from '../auth/store/auth.selector';
import { tap } from 'rxjs';
import { UserAuthenticated } from '../auth/models/user.authenticated.model';
import { selectCurrentMarriageState } from './store/marriage.selectors';
import { MarriageEditComponent } from './marriage-edit/marriage-edit.component';
import { MarriageCreateComponent } from './marriage-create/marriage-create.component';

@Component({
  standalone: true,
  selector: 'app-marriage',
  templateUrl: './marriage.component.html',
  styleUrls: ['./marriage.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    BtnCrazyGradientComponent,
    MarriageEditComponent,
    MarriageCreateComponent,
  ],
})
export class MarriageComponent {
  marriageForm: FormGroup;
  currentUser: UserAuthenticated;
  currentMarriage: Marriage;
  submitted = false;
  isLoading = false;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.marriageForm = new FormGroup({
      photo: new FormControl(null),
      date: new FormControl(null, [Validators.required]),
      moneyExpected: new FormControl(null),
      street: new FormControl(null, [Validators.required]),
      neighborhood: new FormControl(null, [Validators.required]),
      numberAddress: new FormControl(null, [Validators.required]),
    });

    this.store
      .select(selectAuthUserAuthenticated)
      .pipe(
        tap((userAuthenticated) => {
          this.currentUser = userAuthenticated;
        })
      )
      .subscribe();

    this.store
      .select(selectCurrentMarriageState)
      .pipe(
        tap((marriage) => {
          this.currentMarriage = marriage;
        })
      )
      .subscribe();

    this.store.dispatch(getMarriageByUserId({ userId: this.currentUser.id }));
  }

  onSubmit() {
    console.log(this.marriageForm);
    if (!this.marriageForm.valid) return;

    const marriage = new Marriage(
      this.marriageForm.value.photo,
      this.marriageForm.value.date,
      this.marriageForm.value.moneyExpected,
      this.marriageForm.value.street,
      this.marriageForm.value.neighborhood,
      this.marriageForm.value.numberAddress
    );

    console.log(marriage);

    this.store.dispatch(addMarriage({ Marriage: marriage }));
  }

  onHandleError() {
    this.store.dispatch(clearError());
  }
}
