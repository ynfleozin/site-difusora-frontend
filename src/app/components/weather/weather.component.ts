// 1. Importe o CommonModule
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Weather } from '../../models/weather.model';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  weather!: Weather;
  timeOfDayClass: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.setDynamicBackground();
    this.weatherService.getWeather().subscribe({
      next: (apiData: Weather) => {
        this.weather = apiData;
      },
      error: (err) => {
        console.error('Erro ao buscar dados do clima', err);
      },
    });
  }

  private setDynamicBackground(): void {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Sao_Paulo',
      hour: 'numeric',
      hour12: false,
    };
    const currentHour = parseInt(
      new Intl.DateTimeFormat('pt-BR', options).format(new Date())
    );

    if (currentHour >= 6 && currentHour < 18) {
      this.timeOfDayClass = 'day-gradient';
    } else {
      this.timeOfDayClass = 'night-gradient';
    }
  }
}
