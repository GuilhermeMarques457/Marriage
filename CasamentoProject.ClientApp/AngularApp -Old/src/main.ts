import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';
import * as fromAppState from './app/store/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './app/auth/store/auth.effects';
import { AuthTimeoutService } from './app/auth/auth-timeout.service';
import { AuthGuard } from './app/auth/auth.guard';
import { AuthInterceptorService } from './app/auth/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarriageEffects } from './app/marriage/store/marriage.effects';

bootstrapApplication(AppComponent, {
  providers: [
    AuthTimeoutService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    importProvidersFrom(
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule
    ),
    provideStore(fromAppState.appReducer),
    provideEffects([AuthEffects, MarriageEffects]),
  ],
});
