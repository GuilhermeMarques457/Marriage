import {
  ApplicationConfig,
  forwardRef,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import * as fromAppState from './store/app.reducer';

import { routes } from './app.routes';
import { AuthTimeoutService } from './pages/auth/auth-timeout.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './pages/auth/auth-interceptor.service';
import { AuthGuard } from './pages/auth/auth.guard';
import { AuthEffects } from './pages/auth/store/auth.effects';
import { MarriageEffects } from './pages/marriage/store/marriage.effects';
import { provideEffects } from '@ngrx/effects';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputFieldComponent } from './shared/components/input-field/input-field.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AuthTimeoutService,
    AuthGuard,
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
    provideEffects([AuthEffects, MarriageEffects]),
    provideAnimations(),
  ],
};
