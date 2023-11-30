import { Component } from '@angular/core';
import { Marriage } from './marriage.model';
import { Subscription } from 'rxjs';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import {
  addMarriage,
  getMarriage,
  getMarriages,
} from './store/marriage.actions';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AlertComponent } from '../shared/alert/alert.component';
import {
  selectMarriage,
  selectMarriagesState,
} from './store/marriage.selectors';

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
  ],
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
  currentForm: boolean = true;

  constructor(private store: Store<AppState>) {}

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
      .subscribe((authState) => {
        this.isLoading = authState.loading;
        this.error = authState.error;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onGetMarriage() {
    this.store.dispatch(
      getMarriage({ id: '9381656E-CAC9-4A39-9DCF-A97C824EF545' })
    );
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
      this.marriageForm.value.hour,
      this.marriageForm.value.moneyRaised,
      this.marriageForm.value.moneyExpected,
      this.marriageForm.value.local
    );

    console.log(marriage);
    // this.store.dispatch(addMarriage({ Marriage: marriage }));

    // this.loginForm.reset();
  }
}
