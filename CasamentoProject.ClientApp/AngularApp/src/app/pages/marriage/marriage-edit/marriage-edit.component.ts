import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from '../../../shared/components/date-picker/date-picker.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { MarriageErrors } from '../../../shared/components/input-field/input-validations/marriage-validation';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Marriage } from '../marriage.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { setInputIsDisable } from '../../../shared/store/usefull.actions';

@Component({
  selector: 'app-marriage-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    InputFieldComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    DatePickerComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './marriage-edit.component.html',
  styleUrl: './marriage-edit.component.scss',
})
export class MarriageEditComponent {
  //#region Errors To user
  photoCoupleSrc: string | ArrayBuffer | null;
  photoErrors = MarriageErrors.photoErrors;
  streetErrors = MarriageErrors.streetErrors;
  neighborhoodErrors = MarriageErrors.neighborhoodErrors;
  numberAddressErrors = MarriageErrors.numberAddresssErrors;
  //#endregion
  isInputDisabled = true;

  @Input() marriageForm;
  @Input() currentMarriage: Marriage;

  onFileChange(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoCoupleSrc = e.target.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  constructor(private store: Store<AppState>) {}

  onDisableInput() {
    this.isInputDisabled = !this.isInputDisabled;
    this.store.dispatch(
      setInputIsDisable({ isDisabled: this.isInputDisabled })
    );
  }

  ngOnInit(): void {}

  openInputFile(formInput: HTMLInputElement) {
    formInput.click();
  }
}