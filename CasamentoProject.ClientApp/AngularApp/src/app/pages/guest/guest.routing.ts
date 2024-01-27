import { Route } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { GuestComponent } from './guest.component';
import { GuestCreateComponent } from './guest-create/guest-create.component';

export const GuestRouting: Route[] = [
  {
    path: '',
    component: GuestComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'adicionar',
        component: GuestCreateComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];
