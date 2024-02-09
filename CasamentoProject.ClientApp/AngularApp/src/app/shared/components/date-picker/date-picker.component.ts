import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, Component, Input, forwardRef } from '@angular/core';
import moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DisableControlDirective } from '../../directives/disable-control.directive';
import { selectUsefullState } from '../../store/usefull.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { SharedModule } from '../../modules/shared.module';
import { MaterialModule } from '../../modules/material.module';
import { SharedFormsModule } from '../../modules/forms.module';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    SharedModule,
    MaterialModule,
    SharedFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    DisableControlDirective,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() form: FormGroup;
  @Input() isDisabledInput: boolean;
  @Input() currentValue: any;
  today = new Date();

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {}
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  ngOnInit(): void {
    this.store.select(selectUsefullState).subscribe({
      next: (usefullState) => {
        this.isDisabledInput = usefullState.isInputDisabled;

        this.cdr.detectChanges();
      },
    });
  }

  constructor(
    private store: Store<AppState>,
    private cdr: ChangeDetectorRef,
    private platform: Platform
  ) {}

  public minDate = moment([
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDay(),
  ]);

  get isTouchDevice() {
    return this.platform.ANDROID || this.platform.IOS;
  }
}
