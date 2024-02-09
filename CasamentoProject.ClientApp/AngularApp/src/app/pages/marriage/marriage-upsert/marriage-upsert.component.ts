import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { MarriageErrors } from '../../../shared/components/input-field/input-validations/marriage-validation';
import { AppState } from '../../../store/app.reducer';
import { Marriage } from '../marriage.model';
import {
  selectCurrentMarriageState,
  selectMarriageState,
} from '../store/marriage.selectors';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '../../../shared/components/date-picker/date-picker.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { SharedFormsModule } from '../../../shared/modules/forms.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { setInputIsDisable } from '../../../shared/store/usefull.actions';
import { changePhotoMarriage } from '../store/marriage.actions';

@Component({
  selector: 'app-marriage-upsert',
  standalone: true,
  imports: [
    SharedFormsModule,
    SharedModule,
    MaterialModule,
    InputFieldComponent,
    DatePickerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './marriage-upsert.component.html',
  styleUrl: './marriage-upsert.component.scss',
})
export class MarriageUpsertComponent {
  file?: File;
  photoCoupleSrc: string | ArrayBuffer | null;
  photoErrors = MarriageErrors.photoErrors;
  streetErrors = MarriageErrors.streetErrors;
  neighborhoodErrors = MarriageErrors.neighborhoodErrors;
  numberAddressErrors = MarriageErrors.numberAddresssErrors;
  //#endregion

  //#region Errors To user

  onFileChange(event: any) {
    this.file = <File>event.target.files[0];
    if (event.target.files && this.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoCoupleSrc = e.target.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }

  constructor(private store: Store<AppState>) {}
}
