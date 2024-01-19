import { Component } from '@angular/core';
import { Marriage } from './marriage.model';
import { Store } from '@ngrx/store';
import {
  addMarriage,
  getMarriageByUserId,
  updateMarriage,
} from './store/marriage.actions';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { AppState } from '../../store/app.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BtnCrazyGradientComponent } from '../../shared/components/btn-crazy-gradient/btn-crazy-gradient.component';
import { selectAuthUserAuthenticated } from '../auth/store/auth.selector';
import { tap } from 'rxjs';
import { UserAuthenticated } from '../auth/models/user.authenticated.model';
import { selectMarriageState } from './store/marriage.selectors';
import { MarriageEditComponent } from './marriage-edit/marriage-edit.component';
import { MarriageCreateComponent } from './marriage-create/marriage-create.component';
import { ErrorResponse } from '../../shared/models/error-response.model';

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
  currentMarriage?: Marriage;
  submitted = false;
  isLoading = false;
  error: ErrorResponse = null;

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
      .select(selectMarriageState)
      .pipe(
        tap((marriageState) => {
          this.currentMarriage = marriageState.currentMarriage;

          // if (marriageState.error) {
          //   console.log('criou alert');
          //   this.dialog.open(AlertComponent, {
          //     data: new ErrorResponse(
          //       marriageState.error.error.Message,
          //       marriageState.error.error.Details,
          //       marriageState.error.error.StatusCode
          //     ),
          //     exitAnimationDuration: '300ms',
          //     enterAnimationDuration: '300ms',
          //   });
          // }
        })
      )
      .subscribe();

    this.store.dispatch(getMarriageByUserId({ userId: this.currentUser.id }));
  }

  onSubmit() {
    const currentMarriageId = this.currentMarriage
      ? this.currentMarriage.id
      : null;
    if (!this.marriageForm.valid) return;

    const marriage = new Marriage(
      this.marriageForm.value.photo,
      this.marriageForm.value.date,
      this.marriageForm.value.moneyExpected,
      this.marriageForm.value.street,
      this.marriageForm.value.neighborhood,
      this.marriageForm.value.numberAddress,
      this.currentMarriage.id
    );
    console.log(marriage);

    if (marriage.id) {
      this.store.dispatch(updateMarriage({ Marriage: marriage }));
    } else {
      this.store.dispatch(addMarriage({ Marriage: marriage }));
    }
  }
}
