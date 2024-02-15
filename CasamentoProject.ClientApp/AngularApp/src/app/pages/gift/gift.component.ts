import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { SharedModule } from '../../shared/modules/shared.module';
import { GiftListComponent } from './gift-list/gift-list.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AlertYesNoComponent } from '../../shared/components/alerts/alert-yes-no/alert-yes-no.component';
import { DialogData } from '../../shared/models/dialog-data.model';
import { filter } from 'rxjs';

@Component({
  selector: 'app-gift',
  standalone: true,
  imports: [MaterialModule, SharedModule, GiftListComponent, RouterModule],
  templateUrl: './gift.component.html',
  styleUrl: './gift.component.scss',
})
export class GiftComponent {
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url == '/presentes/editar') this.isEditing = true;
        else this.isEditing = false;
      });
  }

  ngOnInit() {}

  onCloseEditing() {
    this.dialog.open(AlertYesNoComponent, {
      data: new DialogData(
        'Você realmente quer sair?',
        'Ao sair dessa pagina todos os presentes não salvos serão perdidos'
      ),
      exitAnimationDuration: '300ms',
      enterAnimationDuration: '300ms',
    });
  }
}
