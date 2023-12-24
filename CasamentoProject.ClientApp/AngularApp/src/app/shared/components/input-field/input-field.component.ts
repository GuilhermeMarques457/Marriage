import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputError } from '../../models/input-error.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ValidationErrorComponent,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  @Input() label: string;
  @Input() formControlName: string;
  @Input() form: FormGroup;
  @Input() inputErrors: InputError[];
  @Input() placeholder: string;

  ngOnInit(): void {
    console.log(this.label, this.formControlName, this.form, this.inputErrors);
  }
}
