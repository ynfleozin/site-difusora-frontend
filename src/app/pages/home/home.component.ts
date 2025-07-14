import { Component } from '@angular/core';
import { CurrenciesComponent } from "../../components/currencies/currencies.component";
import { LocalNewsComponent } from "../../components/local-news/local-news.component";
import { AdBannerHorizontalComponent } from "../../components/ad-banner-horizontal/ad-banner-horizontal.component";
import { NewsFeedComponent } from "../../components/news-feed/news-feed.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrenciesComponent, LocalNewsComponent, AdBannerHorizontalComponent, NewsFeedComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
