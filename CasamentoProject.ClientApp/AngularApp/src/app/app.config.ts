import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import * as fromAppState from './store/app.reducer';

import { routes } from './app.routes';
// import { AuthTimeoutService } from './pages/auth/auth-timeout.service';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { jwtInterceptor } from './pages/auth/auth-interceptor.service';
import { AuthEffects } from './pages/auth/store/auth.effects';
import { MarriageEffects } from './pages/marriage/store/marriage.effects';
import { provideEffects } from '@ngrx/effects';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { UsefullEffects } from './shared/store/usefull.effects';
import { GuestEffects } from './pages/guest/store/guest.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // AuthTimeoutService,
    provideHttpClient(
      withInterceptors([jwtInterceptor]),
      withInterceptorsFromDi()
    ),

    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'never' },
    },
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
    provideStore(fromAppState.appReducer),
    provideEffects([
      AuthEffects,
      MarriageEffects,
      UsefullEffects,
      GuestEffects,
    ]),
    provideAnimations(),
  ],
};
