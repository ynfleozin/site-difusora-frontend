import { Component } from '@angular/core';
import { NewsCardComponent } from "../news-card/news-card.component";
import { MainNewsCardComponent } from "../main-news-card/main-news-card.component";

@Component({
  selector: 'app-local-news',
  standalone: true,
  imports: [NewsCardComponent, MainNewsCardComponent],
  templateUrl: './local-news.component.html',
  styleUrl: './local-news.component.scss'
})
export class LocalNewsComponent {

}
