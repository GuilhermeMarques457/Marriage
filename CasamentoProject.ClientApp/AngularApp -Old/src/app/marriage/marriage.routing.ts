import { Route } from '@angular/router';
import { MarriageComponent } from './marriage.component';
import { AuthGuard } from '../auth/auth.guard';

export const MarriageRouting: Route[] = [
  {
    path: '',
    component: MarriageComponent,
    canActivate: [AuthGuard],
  },
];
