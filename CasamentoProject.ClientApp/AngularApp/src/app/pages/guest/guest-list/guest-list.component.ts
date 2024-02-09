import { Component, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Guest } from '../guest.model';
import { AppState } from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { getGuestsByMarriageId } from '../store/guest.actions';
import { selectAllGuestsState } from '../store/guest.selectors';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/modules/shared.module';

@Component({
  selector: 'app-guest-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, RouterModule, SharedModule],
  templateUrl: './guest-list.component.html',
  styleUrl: './guest-list.component.scss',
})
export class GuestListComponent {
  displayedColumns: string[] = [
    'name',
    'giftGiven',
    'confirmed',
    'numberOfFamilyMembers',
    'membersFamily',
  ];
  guests: Guest[] = [];
  dataSource = new MatTableDataSource<Guest>([]);

  constructor(private store: Store<AppState>) {}

  @ViewChild('paginator') set paginator(pager: MatPaginator) {
    if (pager) {
      this.dataSource.paginator = pager;
      this.dataSource.paginator.pageSizeOptions = [5, 10, 20];
      this.dataSource.paginator._intl = new MatPaginatorIntl();
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.dataSource.paginator._intl.firstPageLabel = 'Primeira página';
      this.dataSource.paginator._intl.firstPageLabel = 'Ultima página';
      this.dataSource.paginator._intl.nextPageLabel = 'Proxima página';
      this.dataSource.paginator._intl.previousPageLabel = 'Página anterior';

      this.dataSource.paginator._intl.getRangeLabel = (
        page: number,
        pageSize: number,
        length: number
      ) => {
        const start = page * pageSize + 1;
        const end = (page + 1) * pageSize;
        return `${start} - ${end} de ${length} convidados`;
      };
    }
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    // this.store
    //   .select(selectCurrentMarriageState)
    //   .pipe(take(1))
    //   .subscribe({
    //     next: (marriage) => {
    //       console.log(marriage.id);
    //       this.store.dispatch(getGuestsByMarriageId({ id: marriage.id }));
    //     },
    //   });

    this.store.dispatch(getGuestsByMarriageId({ id: 'teste' }));
    this.store.select(selectAllGuestsState).subscribe({
      next: (guests) => {
        this.dataSource = new MatTableDataSource<Guest>(guests);
      },
    });
  }
}
