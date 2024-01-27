import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { GuestCreateComponent } from './guest-create/guest-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertComponent } from '../../shared/components/alert/alert.component';
import { BtnCrazyGradientComponent } from '../../shared/components/btn-crazy-gradient/btn-crazy-gradient.component';
import { Subscription, filter, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    GuestCreateComponent,
    ReactiveFormsModule,
    AlertComponent,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    BtnCrazyGradientComponent,
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss',
})
export class GuestComponent {
  isAdding: boolean = false;
  routeSubs$: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isAdding =
      this.route.firstChild?.snapshot.routeConfig?.path == 'adicionar';
    this.routeSubs$ = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd)
      )
      .subscribe(() => {
        this.isAdding =
          this.route.firstChild?.snapshot.routeConfig?.path == 'adicionar';

        console.log(this.isAdding);
      });
  }

  onCloseAdding() {
    this.dialog.open(AlertComponent, {
      data: 'Voce tem certeza que você quer cancelar? Após aceitar sera impossível reverter',
      exitAnimationDuration: '300ms',
      enterAnimationDuration: '300ms',
    });
  }

  ngOnDestroy() {
    this.routeSubs$.unsubscribe();
  }
}
