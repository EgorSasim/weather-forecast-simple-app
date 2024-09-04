import { WeatherData, WeatherTable } from './weather-page.typings';

export function parseWeatherData(resp: any): WeatherData {
  const utcOffsetSeconds = resp.utcOffsetSeconds();
  const daily = resp.daily()!;

  const weatherData = {
    time: range(
      Number(daily.time()),
      Number(daily.timeEnd()),
      daily.interval()
    ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
    temperature2mMax: daily.variables(0)!.valuesArray()!,
    temperature2mMin: daily.variables(1)!.valuesArray()!,
  };
  return weatherData;
}

export function parseWeatherDataToTable(data: WeatherData): WeatherTable[] {
  let weatherTable: WeatherTable[] = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (let i = 0; i < data.time.length; ++i) {
    weatherTable.push({
      position: i + 1,
      dayName: dayNames[data.time[i].getDay()],
      maxTemperature: +data.temperature2mMax[i].toFixed(2),
      minTemperature: +data.temperature2mMin[i].toFixed(2),
    });
  }

  return weatherTable;
}

function range(start: number, end: number, step: number): Array<any> {
  return Array.from(
    { length: (end - start) / step },
    (_, i) => start + i * step
  );
}
