import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { GuestCreateComponent } from './guest-create/guest-create.component';
import { Subscription, filter, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlertYesNoComponent } from '../../shared/components/alerts/alert-yes-no/alert-yes-no.component';
import { DialogData } from '../../shared/models/dialog-data.model';
import { GuestListComponent } from './guest-list/guest-list.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { SharedFormsModule } from '../../shared/modules/forms.module';
import { MaterialModule } from '../../shared/modules/material.module';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [
    SharedModule,
    SharedFormsModule,
    MaterialModule,
    RouterModule,
    GuestCreateComponent,
    AlertYesNoComponent,
    GuestListComponent,
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss',
})
export class GuestComponent {
  isAdding: boolean = false;
  isNotEditing: boolean = false;
  routeSubs$: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // This is to change the icon in the page
    this.isAdding =
      this.route.firstChild?.snapshot.routeConfig?.path == 'adicionar';
    this.routeSubs$ = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd)
      )
      .subscribe(() => {
        this.isAdding =
          this.route.firstChild?.snapshot.routeConfig?.path == 'adicionar' ||
          this.route.firstChild?.snapshot.routeConfig?.path.includes('editar');
      });
  }

  onCloseAdding() {
    this.dialog.open(AlertYesNoComponent, {
      data: new DialogData(
        'Você realmente quer sair?',
        'Ao sair dessa pagina todos os convidados não salvos serão perdidos'
      ),
      exitAnimationDuration: '300ms',
      enterAnimationDuration: '300ms',
    });
  }

  ngOnDestroy() {
    this.routeSubs$.unsubscribe();
  }
}
