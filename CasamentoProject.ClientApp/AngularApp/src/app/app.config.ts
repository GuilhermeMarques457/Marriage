import { ApplicationConfig, importProvidersFrom } from '@angular/core';
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
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';

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
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
    provideStore(fromAppState.appReducer),
    provideEffects([AuthEffects, MarriageEffects]),
    provideAnimations()
],
};
