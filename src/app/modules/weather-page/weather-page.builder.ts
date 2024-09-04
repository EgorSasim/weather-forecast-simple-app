import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class WeatherPageBuilder {
  public createFormGroup(): FormGroup<any> {
    return new FormGroup({
      country: new FormControl('Belarus'),
      forecastDays: new FormControl(7),
    });
  }
}
