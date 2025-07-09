import { Component } from '@angular/core';
import { CurrenciesComponent } from "../../components/currencies/currencies.component";
import { LocalNewsComponent } from "../../components/local-news/local-news.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrenciesComponent, LocalNewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
