import { ChangeDetectorRef, Component, Input, forwardRef } from '@angular/core';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import {
  FormGroup,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputError } from '../../models/input-error.model';
import { DisableControlDirective } from '../../directives/disable-control.directive';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { selectUsefullState } from '../../store/usefull.selectors';
import { SharedFormsModule } from '../../modules/forms.module';
import { SharedModule } from '../../modules/shared.module';
import { MaterialModule } from '../../modules/material.module';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    SharedFormsModule,
    SharedModule,
    MaterialModule,
    ValidationErrorComponent,
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
