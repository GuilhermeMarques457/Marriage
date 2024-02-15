import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import * as fromAppState from './store/app.reducer';

import { routes } from './app.routes';
// import { AuthTimeoutService } from './pages/auth/auth-timeout.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './pages/auth/auth-interceptor.service';
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
import { GiftEffects } from './pages/gift/store/gift.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // AuthTimeoutService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },

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
      GiftEffects,
    ]),
    provideAnimations(),
  ],
};
