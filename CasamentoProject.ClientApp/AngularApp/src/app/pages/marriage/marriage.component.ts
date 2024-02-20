import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertErrorComponent } from '../../shared/components/alerts/alert-error/alert-error.component';
import { AppState } from '../../store/app.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BtnCrazyGradientComponent } from '../../shared/components/btn-crazy-gradient/btn-crazy-gradient.component';
import { MarriageUpsertComponent } from './marriage-upsert/marriage-upsert.component';
import { selectAuthUserAuthenticated } from '../auth/store/auth.selector';
import { filter, pipe, take } from 'rxjs';
import { getMarriageByUserId } from './store/marriage.actions';
import { selectCurrentMarriageState } from './store/marriage.selectors';
import { Marriage } from './marriage.model';

@Component({
  standalone: true,
  selector: 'app-marriage',
  templateUrl: './marriage.component.html',
  styleUrls: ['./marriage.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertErrorComponent,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    BtnCrazyGradientComponent,
    MarriageUpsertComponent,
  ],
})
export class MarriageComponent {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {}
}
