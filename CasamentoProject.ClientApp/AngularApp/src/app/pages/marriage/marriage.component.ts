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
import {
  selectMarriage,
  selectMarriagesState,
} from './store/marriage.selectors';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { TransformHourToCorrectFormat } from '../../shared/transformers/hour-transformer';
import { PasswordValidator } from '../../shared/validators/password-validator';
import { AppState } from '../../store/app.reducer';

@Component({
  standalone: true,
  selector: 'app-marriage',
  templateUrl: './marriage.component.html',
  styleUrls: ['./marriage.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    AlertComponent,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask({})],
})
export class MarriageComponent {
  recipes: Marriage[];
  subscription: Subscription;

  private storeSubs$: Subscription;
  private alertClose$: Subscription;

  marriageForm: FormGroup;
  submitted = false;
  isLoading = false;
  error: string = null;
  formMode: string = 'add';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.marriageForm = new FormGroup({
      photo: new FormControl(null),
      date: new FormControl(null, [Validators.required]),
      hour: new FormControl(null, [
        Validators.required,
        // PasswordValidator.validate,
      ]),
      moneyRaised: new FormControl(null),
      moneyExpected: new FormControl(null),
      local: new FormControl(null, [Validators.required]),
    });

    this.storeSubs$ = this.store
      .select(selectMarriage)
      .subscribe((authState) => {
        console.log(authState.loading);
        this.isLoading = authState.loading;
        this.error = authState.error;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onGetMarriage() {
    this.store.dispatch(
      getMarriage({ id: 'ff95da97-b77c-493c-b306-42251a84b820' })
    );
  }

  onDeleteMarriage() {
    this.store.dispatch(
      deleteMarriage({ id: '64f82950-9fe4-4b3b-8667-36383ff0df33' })
    );
  }

  onGetMarriages() {
    this.store.dispatch(getMarriages());
  }

  onSubmit() {
    this.submitted = true;
    if (!this.marriageForm.valid) return;

    if (this.formMode == 'update') {
      const marriage = new Marriage(
        this.marriageForm.value.photo,
        this.marriageForm.value.date,
        TransformHourToCorrectFormat.transform(this.marriageForm.value.hour),
        this.marriageForm.value.moneyRaised,
        this.marriageForm.value.moneyExpected,
        this.marriageForm.value.local,
        'ff95da97-b77c-493c-b306-42251a84b820'
      );

      console.log(marriage);

      this.store.dispatch(updateMarriage({ Marriage: marriage }));
    }

    if (this.formMode == 'add') {
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
    }

    // this.loginForm.reset();
  }

  onSwitchAdd() {
    this.formMode = 'add';
    console.log('mode: ' + this.formMode);
  }

  onSwitchUpdate() {
    this.formMode = 'update';
    console.log('mode: ' + this.formMode);
  }

  onHandleError() {
    this.store.dispatch(clearError());
  }
}
