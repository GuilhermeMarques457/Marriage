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
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onClose() {
    if (
      this.router.url == '/convidados/adicionar' ||
      this.router.url.includes('/convidados/editar')
    )
      this.router.navigateByUrl('/convidados');
  }
}
