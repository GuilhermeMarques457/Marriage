import { Route } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthGuardLogin } from '../../shared/guards/auth-login.guard';

export const AuthRouting: Route[] = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthGuardLogin],
  },
];
