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
import { ErrorResponse } from '../../utils/error-response.model';
import { AppState } from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectAuthState } from '../../../pages/auth/store/auth.selector';
import { clearError } from '../../../pages/auth/store/auth.actions';

@Component({
  standalone: true,
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatButtonModule,
  ],
})
export class AlertComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ErrorResponse,
    private store: Store<AppState>,
    private matDialogRef: MatDialogRef<AlertComponent>
  ) {}

  onCloseDialog() {
    this.matDialogRef.close();
    this.onCleanError();
  }

  onCleanError() {
    this.store.dispatch(clearError());
  }
}
