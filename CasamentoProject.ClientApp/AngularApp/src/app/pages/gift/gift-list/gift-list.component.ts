import { Component, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/modules/shared.module';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { Gift } from '../gift.model';
import { selectGiftsState } from '../store/gift.selectors';

@Component({
  selector: 'app-gift-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, RouterModule, SharedModule],
  templateUrl: './gift-list.component.html',
  styleUrl: './gift-list.component.scss',
})
export class GiftListComponent {
  displayedColumns: string[] = ['name', 'description', 'price', 'giftUrl'];
  gifts: Gift[] = [];
  dataSource = new MatTableDataSource<Gift>([]);

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

    this.store.select(selectGiftsState).subscribe({
      next: (gifts) => {
        this.dataSource = new MatTableDataSource<Gift>(gifts);
      },
    });
  }
}
