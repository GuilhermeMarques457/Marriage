import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[isDisabled]',
  standalone: true,
})
export class DisableControlDirective {
  constructor(private ngControl: NgControl) {}

  @Input() isDisabled: boolean;

  ngOnChanges(): void {
    this.applyDisableState();
  }

  private applyDisableState(): void {
    console.log('disable directive, is disabled:' + this.isDisabled);
    const action = this.isDisabled ? 'disable' : 'enable';

    this.ngControl.control[action]();
  }
}
