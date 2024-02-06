import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { BtnCrazyGradientComponent } from '../../../shared/components/btn-crazy-gradient/btn-crazy-gradient.component';
import { ErrorResponse } from '../../../shared/models/error-response.model';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { Guest } from '../guest.model';
import { addGuest, updateGuest } from '../store/guest.actions';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { GuestErrors } from '../../../shared/components/input-field/input-validations/guest-validation';
import { MatTooltipModule, TooltipComponent } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { DisableControlDirective } from '../../../shared/directives/disable-control.directive';
import { setInputIsDisable } from '../../../shared/store/usefull.actions';
import { AlertYesNoComponent } from '../../../shared/components/alerts/alert-yes-no/alert-yes-no.component';

@Component({
  selector: 'app-guest-create',
  standalone: true,
  imports: [
    RouterModule,
    GuestCreateComponent,
    ReactiveFormsModule,
    AlertYesNoComponent,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    BtnCrazyGradientComponent,
    InputFieldComponent,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './guest-create.component.html',
  styleUrl: './guest-create.component.scss',
})
export class GuestCreateComponent {
  guestForm: FormGroup;
  submitted = false;
  isLoading = false;
  error: ErrorResponse = null;
  numberFamilyMembers = [];

  nameErrors = GuestErrors.nameErrors;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit() {
    this.guestForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });

    this.store.dispatch(setInputIsDisable({ isDisabled: false }));
  }

  onSubmit() {
    if (!this.guestForm.valid) return;

    const Guest: Guest = {
      name: this.guestForm.value.name,
      confirmed: false,
      giftGiven: false,
    };

    this.store.dispatch(addGuest({ Guest: Guest }));
  }

  onAddFamilyMember() {
    this.numberFamilyMembers.push(this.numberFamilyMembers.length);
    console.log(this.numberFamilyMembers);
  }
}