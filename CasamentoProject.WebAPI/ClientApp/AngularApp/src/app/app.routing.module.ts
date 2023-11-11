import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const appRoutes: Route[] = [
  { path: '', redirectTo: '/Recipes', pathMatch: 'full' },

  //{
  //  path: 'Auth',
  //  loadChildren: () =>
  //    import('./auth/auth.routing').then((m) => m.AuthRouting),
  //},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
