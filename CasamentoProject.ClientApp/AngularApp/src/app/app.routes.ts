import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './pages/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/Auth', pathMatch: 'full' },
  {
    path: 'Auth',
    loadChildren: () =>
      import('./pages/auth/auth.routing').then((m) => m.AuthRouting),
  },
  {
    path: 'casamento',
    loadChildren: () =>
      import('./pages/marriage/marriage.routing').then(
        (m) => m.MarriageRouting
      ),
  },
  {
    path: 'convidados',
    loadChildren: () =>
      import('./pages/guest/guest.routing').then((g) => g.GuestRouting),
  },
  {
    path: 'presentes',
    loadChildren: () =>
      import('./pages/gift/gift.routing').then((g) => g.GiftRouting),
  },
  {
    path: 'index',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
];
