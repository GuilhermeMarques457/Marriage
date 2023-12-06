import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Route[] = [
  { path: '', redirectTo: '/Auth', pathMatch: 'full' },
  {
    path: 'Auth',
    loadChildren: () =>
      import('./auth/auth.routing').then((m) => m.AuthRouting),
  },
  {
    path: 'Marriage',
    loadChildren: () =>
      import('./marriage/marriage.routing').then((m) => m.MarriageRouting),
  },
  {
    path: 'Home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
