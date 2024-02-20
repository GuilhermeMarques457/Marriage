import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
import { addMarriage, getMarriageByUserId } from '../store/marriage.actions';
import { ErrorResponse } from '../../../shared/models/error-response.model';
import { MatTabsModule } from '@angular/material/tabs';
import { filter, take } from 'rxjs';
import { selectAuthUserAuthenticated } from '../../auth/store/auth.selector';
import { selectCurrentMarriageState } from '../store/marriage.selectors';
import { environment } from '../../../../environments/environment';

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

  currentMarriage: Marriage;

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
  groomFile?: File;
  brideFile?: File;
  coupleFile?: File;

  photoCoupleSrc: string | ArrayBuffer | null;
  photoBrideSrc: string | ArrayBuffer | null;
  photoGroomSrc: string | ArrayBuffer | null;

  @ViewChild('groomImage') groomImageInput: ElementRef;
  @ViewChild('brideImage') brideImageInput: ElementRef;
  @ViewChild('coupleImage') coupleImageInput: ElementRef;

  ngOnInit() {
    this.store
      .select(selectAuthUserAuthenticated)
      .pipe(
        filter((user) => user != null),
        take(1)
      )
      .subscribe((user) => {
        this.store.dispatch(getMarriageByUserId({ userId: user.id }));
      });

    this.store.select(selectCurrentMarriageState).subscribe((marriage) => {
      this.currentMarriage = marriage;
      this.photoCoupleSrc =
        `${environment.API_URL}/${this.currentMarriage?.photoOfCouplePath}`.replace(
          '/api',
          ''
        );
      console.log(this.photoCoupleSrc);

      this.marriageForm = new FormGroup({
        date: new FormControl(this.currentMarriage?.date, [
          Validators.required,
        ]),
        neighborhood: new FormControl(this.currentMarriage?.neighborhood, [
          Validators.required,
        ]),
        street: new FormControl(this.currentMarriage?.street, [
          Validators.required,
        ]),
        numberAddress: new FormControl(this.currentMarriage?.numberAddress, [
          Validators.required,
        ]),
        groom: new FormControl(null, [Validators.required]),
        groomAge: new FormControl(null, [Validators.required]),
        bride: new FormControl(null, [Validators.required]),
        brideAge: new FormControl(null, [Validators.required]),
      });
    });
  }

  onSubmit() {
    if (!this.coupleFile)
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
      addMarriage({
        Marriage: this.marriage,
        PhotoOfCouple: this.coupleFile,
        PhotoOfGroom: this.groomFile,
        PhotoOfBride: this.brideFile,
      })
    );
  }

  onFileChange(event: any) {
    const inputName = event.srcElement.name;
    const reader = new FileReader();

    switch (inputName) {
      case 'groom-img':
        console.log('entrou groom');
        this.groomFile = <File>event.target.files[0];
        reader.onload = (e) => {
          this.photoGroomSrc = e.target.result as string;
        };
        reader.readAsDataURL(this.groomFile);
        break;
      case 'bride-img':
        this.brideFile = <File>event.target.files[0];
        reader.onload = (e) => {
          this.photoBrideSrc = e.target.result as string;
        };
        reader.readAsDataURL(this.brideFile);
        break;
      case 'couple-img':
        this.coupleFile = <File>event.target.files[0];
        reader.onload = (e) => {
          this.photoCoupleSrc = e.target.result as string;
        };
        reader.readAsDataURL(this.coupleFile);
        break;
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
