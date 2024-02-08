import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { GuestErrors } from '../../../shared/components/input-field/input-validations/guest-validation';
import { ErrorResponse } from '../../../shared/models/error-response.model';
import { setInputIsDisable } from '../../../shared/store/usefull.actions';
import { AppState } from '../../../store/app.reducer';
import { selectCurrentMarriageState } from '../../marriage/store/marriage.selectors';
import { addGuest, getFamilyMembersByGuestId } from '../store/guest.actions';
import { Guest } from '../guest.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AlertYesNoComponent } from '../../../shared/components/alerts/alert-yes-no/alert-yes-no.component';
import { BtnCrazyGradientComponent } from '../../../shared/components/btn-crazy-gradient/btn-crazy-gradient.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { GuestCreateComponent } from '../guest-create/guest-create.component';
import { selectCurrentFamilyState } from '../store/guest.selectors';
import { FamilyMember } from '../family.model';

@Component({
  selector: 'app-guest-edit',
  standalone: true,
  imports: [
    RouterModule,
    GuestCreateComponent,
    ReactiveFormsModule,
    AlertYesNoComponent,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    BtnCrazyGradientComponent,
    InputFieldComponent,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './guest-edit.component.html',
  styleUrl: './guest-edit.component.scss',
})
export class GuestEditComponent {
  guestForm: FormGroup;
  submitted = false;
  isLoading = false;
  error: ErrorResponse = null;
  familyMembers: FamilyMember[] = [];
  isEditing: boolean = false;

  nameErrors = GuestErrors.nameErrors;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.guestForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });

    this.store.dispatch(setInputIsDisable({ isDisabled: true }));

    this.route.url.subscribe({
      next: (url) => {
        this.store.dispatch(
          getFamilyMembersByGuestId({ guestId: url[1].path })
        );
      },
    });

    this.store.select(selectCurrentFamilyState).subscribe({
      next: (family) => {
        this.familyMembers = family;

        this.familyMembers.forEach((member, index) => {
          this.guestForm.addControl(
            `guest-${index + 1}`,
            new FormControl('', Validators.required)
          );
        });
      },
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  onSubmit() {
    if (!this.guestForm.valid) return;

    let guests: string[] = [];
    // This is to add the name of the family members
    this.familyMembers.forEach((x, index) => {
      const guest = this.guestForm.value['guest-' + (index + 1)];
      guests.push(guest);
    });

    this.store
      .select(selectCurrentMarriageState)
      .pipe(take(1))
      .subscribe({
        next: (marriage) => {
          const guest: Guest = {
            name: this.guestForm.value.name,
            familyMembers: guests,
            marriageId: marriage.id,
            confirmed: false,
            giftGiven: false,
            numberOfFamilyMembers: 0,
          };

          this.store.dispatch(addGuest({ Guest: guest }));
        },
      });
  }

  onAddFamilyMember() {
    this.guestForm.addControl(
      `guest-${this.familyMembers.length}`,
      new FormControl('', Validators.required)
    );
  }

  onStartEditing() {
    this.store.dispatch(setInputIsDisable({ isDisabled: false }));
  }
}
