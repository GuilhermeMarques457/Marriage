import { Route } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const AuthRouting: Route[] = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', component: SignUpComponent },
      { path: 'Login', component: LoginComponent },
      { path: 'SignUp', component: SignUpComponent },
    ],
  },
];
