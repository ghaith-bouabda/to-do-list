import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';

export const appConfig = [
  provideHttpClient(),
  provideRouter(routes),
  importProvidersFrom(FormsModule),
];
