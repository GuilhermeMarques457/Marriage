import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../../../models/dialog-data.model';

@Component({
  selector: 'app-alert-yes-no',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './alert-yes-no.component.html',
  styleUrl: './alert-yes-no.component.scss',
})
export class AlertYesNoComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertYesNoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
