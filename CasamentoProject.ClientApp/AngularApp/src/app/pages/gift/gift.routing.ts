import { Route } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { GiftComponent } from './gift.component';
import { GiftUpsertComponent } from './gift-upsert/gift-upsert.component';

export const GiftRouting: Route[] = [
  {
    path: '',
    component: GiftComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'editar/:id',
        component: GiftUpsertComponent,
      },
      {
        path: 'editar',
        component: GiftUpsertComponent,
      },
    ],
  },
];
