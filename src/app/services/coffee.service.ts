import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment-development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LatestCoffeeQuote } from '../models/coffee/latest-coffee-quote.model.ts';

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {
  private readonly apiUrl = environment.apiUrl + '/coffee';
  private http = inject(HttpClient);

  getCoffeeQuotes(): Observable<LatestCoffeeQuote> {
    return this.http.get<LatestCoffeeQuote>(`${this.apiUrl}`);
  }
}
