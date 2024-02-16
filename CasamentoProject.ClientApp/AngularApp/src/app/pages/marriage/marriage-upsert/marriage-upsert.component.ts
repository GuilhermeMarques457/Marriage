import { Component, ElementRef, ViewChild } from '@angular/core';
import { MarriageErrors } from '../../../shared/components/input-field/input-validations/marriage-validation';
import { AppState } from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
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
import { MatDialog } from '@angular/material/dialog';
import { AlertErrorComponent } from '../../../shared/components/alerts/alert-error/alert-error.component';
import { HourValidator } from '../../../shared/validators/hour-validator';
import { Marriage } from '../marriage.model';
import { addMarriage } from '../store/marriage.actions';
import { ErrorResponse } from '../../../shared/models/error-response.model';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-marriage-upsert',
  standalone: true,
  imports: [
    SharedFormsModule,
    SharedModule,
    MaterialModule,
    InputFieldComponent,
    ReactiveFormsModule,
    DatePickerComponent,
    MatTabsModule,
  ],
  templateUrl: './marriage-upsert.component.html',
  styleUrl: './marriage-upsert.component.scss',
})
export class MarriageUpsertComponent {
  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  photoCoupleSrc: string | ArrayBuffer | null;
  photoErrors = MarriageErrors.photoErrors;
  streetErrors = MarriageErrors.streetErrors;
  neighborhoodErrors = MarriageErrors.neighborhoodErrors;
  numberAddressErrors = MarriageErrors.numberAddresssErrors;
  groomErrors = MarriageErrors.groomErrors;
  brideErrors = MarriageErrors.brideErrors;
  brideAgeErrors = MarriageErrors.brideAgeErrors;
  groomAgeErrors = MarriageErrors.groomAgeErrors;

  marriageForm: FormGroup;
  marriage: Marriage;
  isLoading = false;
  file?: File;

  @ViewChild('groomImage') groomImageInput: ElementRef;
  @ViewChild('brideImage') brideImageInput: ElementRef;
  @ViewChild('coupleImage') coupleImageInput: ElementRef;

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
      groomAge: new FormControl(null, [Validators.required]),
      bride: new FormControl(null, [Validators.required]),
      brideAge: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (!this.file)
      this.dialog.open(AlertErrorComponent, {
        data: new ErrorResponse(
          'Foto Requirida',
          'Foto do casal é necessária para o envio do formulário',
          '400'
        ),
        exitAnimationDuration: '300ms',
        enterAnimationDuration: '300ms',
      });

    this.marriage = new Marriage(
      '',
      this.marriageForm.value.date,
      0,
      this.marriageForm.value.street,
      this.marriageForm.value.neighborhood,
      this.marriageForm.value.numberAddress
    );

    this.store.dispatch(
      addMarriage({ Marriage: this.marriage, PhotoOfCouple: this.file })
    );
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

  onOpenGroomImage() {
    this.groomImageInput.nativeElement.click();
  }

  onOpenCoupleImage() {
    this.coupleImageInput.nativeElement.click();
  }

  onOpenBrideImage() {
    this.brideImageInput.nativeElement.click();
  }
}
