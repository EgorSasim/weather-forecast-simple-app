import { Injectable } from '@angular/core';
import { WeatherApiService } from '../../api/weather.service';
import { Observable } from 'rxjs';
import { WeatherApiResponse } from '@openmeteo/sdk/weather-api-response';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherPageService {
  constructor(
    private weatherApiService: WeatherApiService,
    private httpClient: HttpClient
  ) {}

  public getWeather(params: any): Observable<WeatherApiResponse> {
    return this.weatherApiService.getForecast({
      ...params,
      daily: ['temperature_2m_max', 'temperature_2m_min'],
    });
  }
}
