import { Routes } from '@angular/router';
import { WeatherPageComponent } from './modules/weather-page/weather-page.component';

export const routes: Routes = [
  { path: '**', redirectTo: 'weather-page', pathMatch: 'full' },
  {
    path: 'weather-page',
    loadComponent: () =>
      import('./modules/weather-page/weather-page.component').then(
        (c) => c.WeatherPageComponent
      ),
  },
];
