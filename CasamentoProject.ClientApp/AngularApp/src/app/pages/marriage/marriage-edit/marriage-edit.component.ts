import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import {
  changePhotoMarriage,
  getPhotoMarriage,
} from '../store/marriage.actions';
import { selectMarriageState } from '../store/marriage.selectors';
import { SharedModule } from '../../../shared/modules/shared.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { environment } from '../../../../environments/environment';
import { SharedFormsModule } from '../../../shared/modules/forms.module';

@Component({
  selector: 'app-marriage-edit',
  standalone: true,
  imports: [
    SharedFormsModule,
    SharedModule,
    MaterialModule,
    InputFieldComponent,
    DatePickerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './marriage-edit.component.html',
  styleUrl: './marriage-edit.component.scss',
})
export class MarriageEditComponent {
  //#region Errors To user
  file?: File;
  photoCoupleSrc: string | ArrayBuffer | null;
  photoErrors = MarriageErrors.photoErrors;
  streetErrors = MarriageErrors.streetErrors;
  neighborhoodErrors = MarriageErrors.neighborhoodErrors;
  numberAddressErrors = MarriageErrors.numberAddresssErrors;
  //#endregion
  isInputDisabled = true;

  @Input() marriageForm;
  @Input() currentMarriage: Marriage;
  @Output() photoEvent = new EventEmitter<File>();

  //#region Errors To user

  onFileChange(event: any) {
    this.file = <File>event.target.files[0];
    if (event.target.files && this.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoCoupleSrc = e.target.result as string;
      };
      reader.readAsDataURL(this.file);

      this.store.dispatch(
        changePhotoMarriage({ Photo: this.file, id: this.currentMarriage.id })
      );

      this.photoEvent.emit(this.file);
    }
  }

  constructor(private store: Store<AppState>) {}

  onDisableInput() {
    this.isInputDisabled = !this.isInputDisabled;
    this.store.dispatch(
      setInputIsDisable({ isDisabled: this.isInputDisabled })
    );
  }

  ngOnInit(): void {
    this.store.select(selectMarriageState).subscribe((state) => {
      this.photoCoupleSrc = (
        environment.API_URL + state.currentMarriage.photoOfCouplePath
      ).replace('api', '');
    });
  }

  openInputFile(formInput: HTMLInputElement) {
    formInput.click();
  }
}
