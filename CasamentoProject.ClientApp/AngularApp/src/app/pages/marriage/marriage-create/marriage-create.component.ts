import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from '../../../shared/components/date-picker/date-picker.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';

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
  ],
  templateUrl: './marriage-create.component.html',
  styleUrl: './marriage-create.component.css',
})
export class MarriageCreateComponent {}
