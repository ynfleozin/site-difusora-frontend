import { Component } from '@angular/core';
import { CurrenciesComponent } from "../../components/currencies/currencies.component";
import { LocalNewsComponent } from "../../components/local-news/local-news.component";
import { AdBannerHorizontalComponent } from "../../components/ad-banner-horizontal/ad-banner-horizontal.component";
import { LatestNewsComponent } from "../../components/latest-news/latest-news.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrenciesComponent, LocalNewsComponent, AdBannerHorizontalComponent, LatestNewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
