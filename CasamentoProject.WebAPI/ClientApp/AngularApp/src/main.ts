import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app.routing.module';
import {
  HttpClientModule,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';



bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      HttpClientModule,
    ),
  ],
});
