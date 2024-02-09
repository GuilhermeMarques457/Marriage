import { Component } from '@angular/core';
import { Marriage } from './marriage.model';
import { Store } from '@ngrx/store';
import {
  addMarriage,
  changePhotoMarriage,
  getMarriageByUserId,
  updateMarriage,
} from './store/marriage.actions';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertErrorComponent } from '../../shared/components/alerts/alert-error/alert-error.component';
import { AppState } from '../../store/app.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BtnCrazyGradientComponent } from '../../shared/components/btn-crazy-gradient/btn-crazy-gradient.component';
import { selectAuthUserAuthenticated } from '../auth/store/auth.selector';
import { tap } from 'rxjs';
import { UserAuthenticated } from '../auth/models/user.authenticated.model';
import {
  selectCurrentMarriageState,
  selectMarriageState,
} from './store/marriage.selectors';
import { ErrorResponse } from '../../shared/models/error-response.model';
import { setInputIsDisable } from '../../shared/store/usefull.actions';
import { Router } from '@angular/router';
import { MarriageUpsertComponent } from './marriage-upsert/marriage-upsert.component';

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
export class MarriageComponent {}
