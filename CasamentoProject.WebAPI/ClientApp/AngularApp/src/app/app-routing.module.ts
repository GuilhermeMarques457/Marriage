import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Route[] = [
  { path: '', redirectTo: '/Auth', pathMatch: 'full' },
  {
    path: 'Auth',
    loadChildren: () =>
      import('./auth/auth.routing').then((m) => m.AuthRouting),
  },
  {
    path: 'Home',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
