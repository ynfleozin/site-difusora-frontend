import { Component, inject, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../models/weather.model';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CapitalizePipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  weather!: Weather;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeather().subscribe({
      next: (apiData: Weather) => {
        this.weather = apiData;
      },
      error: (err) => {
        console.error('Erro ao buscar dados do clima', err);
      },
    });
  }
}
