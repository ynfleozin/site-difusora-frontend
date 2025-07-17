import { Banner } from './../models/banner.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor() {}

  getBanners(): Observable<Banner[]> {
    const mockBanners: Banner[] = [
      {
        id: 'home-main',
        name: 'Banner Principal da Home',
        imageUrl: 'assets/imgs/BannerDifusora.jpg',
      },
      {
        id: 'ad-banner-1',
        name: 'Banner Horizontal (após cotações)',
        imageUrl: 'assets/imgs/ad-banner.jpg',
      },
      {
        id: 'ad-banner-2',
        name: 'Banner Horizontal (após notícias locais)',
        imageUrl: 'assets/imgs/ad-banner.jpg',
      },
    ];
    return of(mockBanners);
  }

  updateBannerImage(id: string, newImageUrl: string): Observable<any> {
    console.log(`Atualizando banner ${id} com a nova imagem ${newImageUrl}`);
    return of({ sucess: true, bannerId: id, newUrl: newImageUrl });
  }
}
