import { Injectable } from '@angular/core';
import { fetchWeatherApi } from 'openmeteo';
import { from, Observable } from 'rxjs';
import { WeatherApiResponse } from '@openmeteo/sdk/weather-api-response';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  public readonly url = 'https://api.open-meteo.com/v1/forecast';

  public getForecast(params: any): Observable<WeatherApiResponse> {
    return from(fetchWeatherApi(this.url, params).then((resp) => resp[0]));
  }
}
