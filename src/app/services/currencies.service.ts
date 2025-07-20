import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private apiUrl = 'http://localhost:3001/api/currencies';

  constructor(private http: HttpClient) {}

  getCurrencyQuotes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
}
