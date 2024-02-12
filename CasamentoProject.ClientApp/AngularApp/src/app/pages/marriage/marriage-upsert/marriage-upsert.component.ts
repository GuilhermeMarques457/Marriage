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
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePickerComponent } from '../../../shared/components/date-picker/date-picker.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { SharedFormsModule } from '../../../shared/modules/forms.module';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { setInputIsDisable } from '../../../shared/store/usefull.actions';
import { changePhotoMarriage } from '../store/marriage.actions';
import { MatDialog } from '@angular/material/dialog';
import { AlertYesNoComponent } from '../../../shared/components/alerts/alert-yes-no/alert-yes-no.component';
import { DialogData } from '../../../shared/models/dialog-data.model';
import { AlertErrorComponent } from '../../../shared/components/alerts/alert-error/alert-error.component';
import { HourValidator } from '../../../shared/validators/hour-validator';

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
  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  isLoading = false;
  file?: File;
  photoCoupleSrc: string | ArrayBuffer | null;
  photoErrors = MarriageErrors.photoErrors;
  streetErrors = MarriageErrors.streetErrors;
  neighborhoodErrors = MarriageErrors.neighborhoodErrors;
  numberAddressErrors = MarriageErrors.numberAddresssErrors;
  groomErrors = MarriageErrors.groomErrors;
  brideErrors = MarriageErrors.brideErrors;

  marriageForm: FormGroup;

  ngOnInit() {
    this.marriageForm = new FormGroup({
      date: new FormControl(null, [
        Validators.required,
        HourValidator.validate,
      ]),
      neighborhood: new FormControl(null, [Validators.required]),
      street: new FormControl(null, [Validators.required]),
      numberAddress: new FormControl(null, [Validators.required]),
      groom: new FormControl(null, [Validators.required]),
      bride: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (!this.file)
      this.dialog.open(AlertErrorComponent, {
        data: 'Foto do casal é necessario para cadastro',
        exitAnimationDuration: '300ms',
        enterAnimationDuration: '300ms',
      });
  }

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
}
