import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-crazy-gradient',
  standalone: true,
  imports: [],
  templateUrl: './btn-crazy-gradient.component.html',
  styleUrl: './btn-crazy-gradient.component.scss',
})
export class BtnCrazyGradientComponent {
  @Input() form;
  @Input() buttonText;
}
