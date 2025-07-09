import { Component } from '@angular/core';
import { CurrenciesComponent } from "../../components/currencies/currencies.component";
import { LocalNewsComponent } from "../../components/local-news/local-news.component";
import { AdBannerHorizontalComponent } from "../../components/ad-banner-horizontal/ad-banner-horizontal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrenciesComponent, LocalNewsComponent, AdBannerHorizontalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
