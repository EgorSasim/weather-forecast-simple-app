import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { WeatherPageBuilder } from './weather-page.builder';
import { WEATHER_PAGE_FORECAST_DAYS } from './weather-page.constants';
import { WeatherPageService } from './weather-page.service';
import { Country, WeatherTable } from './weather-page.typings';
import { MatButtonModule } from '@angular/material/button';
import {
  parseWeatherData,
  parseWeatherDataToTable,
} from './weather-page.helpers';
import { Subject } from 'rxjs';
import { WeatherPageTable } from './weather-page-table/weather-page-table.component';
import { CommonModule } from '@angular/common';
import { WeatherPageGraphComponent } from './weather-page-graph/weather-page-graph.component';

@Component({
  selector: 'app-weather-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    WeatherPageTable,
    CommonModule,
    WeatherPageGraphComponent,
  ],
  templateUrl: './weather-page.component.html',
  styleUrl: './weather-page.component.scss',
  providers: [WeatherPageService, WeatherPageBuilder],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherPageComponent {
  public readonly forecastDaysKeys = Object.keys(WEATHER_PAGE_FORECAST_DAYS);
  public readonly forecastDays = WEATHER_PAGE_FORECAST_DAYS;
  public form = this.weatherPageBuilder.createFormGroup();
  public countries: Country[];
  public countriesNames: Country['name'][];
  public weatherData: Subject<WeatherTable[]> = new Subject();

  constructor(
    private weatherPageService: WeatherPageService,
    private httpClient: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private weatherPageBuilder: WeatherPageBuilder
  ) {
    this.setCountriesNames();
  }

  public getWeather(): void {
    const country: Country = this.countries.find(
      (country) => country.name === this.form.value.country
    );
    this.weatherPageService
      .getWeather({
        latitude: country.latitude,
        longitude: country.longitude,
        forecast_days: this.form.value.forecastDays,
      })
      .subscribe((res) => {
        this.weatherData.next(parseWeatherDataToTable(parseWeatherData(res)));
      });
  }

  private setCountriesNames(): void {
    this.httpClient
      .get<Country[]>('assets/countries.json')
      .subscribe((countries) => {
        this.countries = countries;
        this.countriesNames = countries.map((country) => country.name);
        this.changeDetectorRef.markForCheck();
      });
  }
}
