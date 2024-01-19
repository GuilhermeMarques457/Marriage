import { ChangeDetectorRef, Component, Input, forwardRef } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputError } from '../../models/input-error.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DisableControlDirective } from '../../directives/disable-control.directive';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { selectUsefullState } from '../../store/usefull.selectors';

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
    MatButtonModule,
    DisableControlDirective,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent implements ControlValueAccessor {
  onChange: any = () => {};
  onTouch: any = () => {};
  password = false;

  writeValue(value: any): void {}
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  ngOnInit(): void {
    if (this.isPassword) this.password = true;

    this.store.select(selectUsefullState).subscribe({
      next: (usefullState) => {
        this.isDisabledInput = usefullState.isInputDisabled;

        this.cdr.detectChanges();
      },
    });
  }

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef) {
    this.isDisabledInput = false;
  }

  @Input() isPassword: boolean;
  @Input() label: string;
  @Input() formControlName: string;
  @Input() form: FormGroup;
  @Input() inputErrors: InputError[];
  @Input() placeholder: string;
  @Input() icon: string;
  @Input() isDisabledInput: boolean;
}
