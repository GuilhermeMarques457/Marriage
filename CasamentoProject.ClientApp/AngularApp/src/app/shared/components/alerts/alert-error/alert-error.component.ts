import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ErrorResponse } from '../../../models/error-response.model';
import { AppState } from '../../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { clearMarriageError } from '../../../../pages/marriage/store/marriage.actions';
import { clearAuthError } from '../../../../pages/auth/store/auth.actions';

@Component({
  standalone: true,
  selector: 'app-alert',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.scss'],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatButtonModule,
  ],
})
export class AlertErrorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ErrorResponse,
    private store: Store<AppState>,
    private matDialogRef: MatDialogRef<AlertErrorComponent>
  ) {}

  onCloseDialog() {
    this.matDialogRef.close();
    this.onCleanError();
  }

  onCleanError() {
    this.store.dispatch(clearAuthError());
    this.store.dispatch(clearMarriageError());
  }
}
