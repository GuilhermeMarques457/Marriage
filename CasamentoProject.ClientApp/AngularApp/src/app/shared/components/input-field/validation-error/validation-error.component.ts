import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputError } from '../../../models/input-error.model';

@Component({
  selector: 'app-validation-error',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './validation-error.component.html',
  styleUrl: './validation-error.component.scss',
})
export class ValidationErrorComponent {
  @Input() form: FormGroup;
  @Input() inputError: InputError;
  @Input() formControlName: string;
}
