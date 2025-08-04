import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment-development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiUrl = environment.apiUrl + '/weather';

  private http = inject(HttpClient);

  constructor() {}

  getWeather(): Observable<Weather> {
    return this.http.get<Weather>(`${this.apiUrl}`);
  }
}
