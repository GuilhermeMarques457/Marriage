import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from '../../../shared/components/date-picker/date-picker.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { MarriageErrors } from '../../../shared/components/input-field/input-validations/marriage-validation';
import { Marriage } from '../marriage.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-marriage-create',
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
  templateUrl: './marriage-create.component.html',
  styleUrl: './marriage-create.component.scss',
})
export class MarriageCreateComponent {
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

  ngOnInit(): void {}

  openInputFile(formInput: HTMLInputElement) {
    formInput.click();
  }
}
