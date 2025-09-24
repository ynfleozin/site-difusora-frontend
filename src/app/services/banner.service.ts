import { Banner } from './../models/banner.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  updateBannerVisibility(id: string, isVisible: boolean): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/visibility`, { isVisible });
  }
}
