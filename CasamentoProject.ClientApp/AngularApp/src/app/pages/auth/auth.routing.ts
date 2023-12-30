import { Route } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthRedirectIfLoggedGuard } from './auth.guard';

export const AuthRouting: Route[] = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthRedirectIfLoggedGuard],
  },
];
