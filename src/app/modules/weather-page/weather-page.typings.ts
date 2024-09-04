export interface Country {
  key: string;
  latitude: number;
  longitude: number;
  name: string;
}

export interface WeatherData {
  temperature2mMax: number[];
  temperature2mMin: number[];
  time: Date[];
}

export interface WeatherTable {
  position: number;
  dayName: string;
  maxTemperature: number;
  minTemperature: number;
}
