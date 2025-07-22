// home.component.ts (AJUSTADO)
import {
  Component,
  OnInit,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrenciesComponent } from '../../components/currencies/currencies.component';
import { LocalNewsComponent } from '../../components/local-news/local-news.component';
import { AdBannerHorizontalComponent } from '../../components/ad-banner-horizontal/ad-banner-horizontal.component';
import { LatestNewsComponent } from '../../components/latest-news/latest-news.component';
import { BannerService } from '../../services/banner.service';
import { Banner } from '../../models/banner.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CurrenciesComponent,
    LocalNewsComponent,
    AdBannerHorizontalComponent,
    LatestNewsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private bannerService = inject(BannerService);

  public adBanner1: WritableSignal<Banner | undefined> = signal(undefined);
  public adBanner2: WritableSignal<Banner | undefined> = signal(undefined);

  ngOnInit(): void {
    this.loadAdBanners();
  }

  loadAdBanners(): void {
    this.bannerService.getBanners().subscribe({
      next: (data) => {
        this.adBanner1.set(data.find((banner) => banner.id === 'ad-banner-1'));
        this.adBanner2.set(data.find((banner) => banner.id === 'ad-banner-2'));
      },
      error: (err) => {
        console.error('Falha ao carregar banners de anúncio na Home:', err);
      },
    });
  }
}
