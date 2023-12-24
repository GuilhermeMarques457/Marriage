import { Component } from '@angular/core';
import { Marriage } from './marriage.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  addMarriage,
  clearError,
  deleteMarriage,
  getMarriage,
  getMarriages,
  updateMarriage,
} from './store/marriage.actions';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { selectMarriage } from './store/marriage.selectors';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { TransformHourToCorrectFormat } from '../../shared/transformers/hour-transformer';
import { AppState } from '../../store/app.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorResponse } from '../../shared/utils/error-response.model';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-marriage',
  templateUrl: './marriage.component.html',
  styleUrls: ['./marriage.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class MarriageComponent {
  recipes: Marriage[];
  subscription: Subscription;

  private storeSubs$: Subscription;

  marriageForm: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.marriageForm = new FormGroup({
      photo: new FormControl(null),
      date: new FormControl(null, [Validators.required]),
      hour: new FormControl(null, [Validators.required]),
      moneyRaised: new FormControl(null),
      moneyExpected: new FormControl(null),
      local: new FormControl(null, [Validators.required]),
    });

    this.storeSubs$ = this.store
      .select(selectMarriage)
      .subscribe((marriageState) => {
        if (marriageState.error) {
          this.dialog.open(AlertComponent, {
            data: new ErrorResponse(
              marriageState.error.error.Message,
              marriageState.error.error.Details,
              marriageState.error.error.StatusCode
            ),
            exitAnimationDuration: '300ms',
            enterAnimationDuration: '300ms',
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onGetMarriages() {
    this.store.dispatch(getMarriages());
  }

  onSubmit() {
    this.submitted = true;
    if (!this.marriageForm.valid) return;

    const marriage = new Marriage(
      this.marriageForm.value.photo,
      this.marriageForm.value.date,
      TransformHourToCorrectFormat.transform(this.marriageForm.value.hour),
      this.marriageForm.value.moneyRaised,
      this.marriageForm.value.moneyExpected,
      this.marriageForm.value.local
    );

    console.log(marriage);

    this.store.dispatch(addMarriage({ Marriage: marriage }));

    // this.loginForm.reset();
  }

  onHandleError() {
    this.store.dispatch(clearError());
  }
}
