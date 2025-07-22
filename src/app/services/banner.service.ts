// banner.service.ts (modificado)
import { Banner } from './../models/banner.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment-development';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private apiUrl = environment.apiUrl + '/banners';

  constructor(private http: HttpClient) {}

  getBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(this.apiUrl);
  }

  updateBannerImage(id: string, newImageUrl: string): Observable<any> {
    const body = { imageUrl: newImageUrl };
    return this.http.put(`${this.apiUrl}/${id}`, body);
  }
}
