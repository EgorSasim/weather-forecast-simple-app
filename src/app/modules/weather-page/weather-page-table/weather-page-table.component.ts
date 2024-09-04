import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-weather-page-table',
  templateUrl: './weather-page-table.component.html',
  standalone: true,
  imports: [MatTableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherPageTable {
  public table: InputSignal<WeatherPageTable> = input();
  public readonly tableHeaders = ['position', 'day', 'min temp.', 'max temp.'];
}
