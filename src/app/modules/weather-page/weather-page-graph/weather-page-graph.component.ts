import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsDirective } from 'ngx-echarts';
import { WeatherTable } from '../weather-page.typings';

@Component({
  selector: 'app-weather-page-graph',
  templateUrl: './weather-page-graph.component.html',
  styleUrl: './weather-page-graph.component.scss',
  imports: [NgxEchartsDirective],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherPageGraphComponent implements OnChanges {
  public temperaturesData: InputSignal<WeatherTable[]> = input();
  public options: any;

  public ngOnChanges(changes: SimpleChanges): void {
    const xAxisData = [...this.temperaturesData().map((data) => data.dayName)];
    const minTempData = [
      ...this.temperaturesData().map((data) => data.minTemperature),
    ];
    const maxTempData = [
      ...this.temperaturesData().map((data) => data.maxTemperature),
    ];

    this.options = {
      legend: {
        data: ['min temperature', 'max temperature'],
        align: 'left',
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'min temperature',
          type: 'bar',
          data: minTempData,
          animationDelay: (idx) => idx * 10,
        },
        {
          name: 'max temperature',
          type: 'bar',
          data: maxTempData,
          animationDelay: (idx) => idx * 10 + 100,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }
}
