import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/currency.model';
import { environment } from '../../../environments/environment-development';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  private readonly apiUrl = environment.apiUrl + '/currencies';

  constructor(private http: HttpClient) {}

  getCurrencyQuotes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl);
  }
}
