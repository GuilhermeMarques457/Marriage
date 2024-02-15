import { Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { SharedModule } from '../../../shared/modules/shared.module';
import { SharedFormsModule } from '../../../shared/modules/forms.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { GiftErrors } from '../../../shared/components/input-field/input-validations/gift-validation';

@Component({
  selector: 'app-gift-upsert',
  standalone: true,
  imports: [
    MaterialModule,
    SharedModule,
    SharedFormsModule,
    InputFieldComponent,
  ],
  templateUrl: './gift-upsert.component.html',
  styleUrl: './gift-upsert.component.scss',
})
export class GiftUpsertComponent {
  giftForm?: FormGroup;
  isLoading = false;

  nameErrors = GiftErrors.nameErrors;
  descriptionErrors = GiftErrors.descriptionErrors;
  priceErrors = GiftErrors.priceErrors;
  giftUrlErrors = GiftErrors.giftUrlErrors;

  ngOnInit() {
    this.giftForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      giftUrl: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {}
}
