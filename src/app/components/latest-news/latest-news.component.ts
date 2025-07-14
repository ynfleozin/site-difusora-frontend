import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NewsArticle } from '../../models/news-article.model';
import { MOCK_NEWS } from '../../../../public/assets/mock-news';
import { NewsCardComponent } from '../news-card/news-card.component';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [NewsCardComponent],
  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.scss'
})
export class LatestNewsComponent implements OnChanges, OnInit{
  @Input() allNews: NewsArticle[] = [];
  
    latestNews: NewsArticle[] = [];

  
    ngOnInit(): void {
      this.allNews = MOCK_NEWS;
      this.processNews();
    }
  
    // Processa os dados
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['allNews'] && this.allNews.length > 0) {
        this.processNews();
      }
    }
  
    private processNews(): void {
      // Ordena por ordem de postagem
      const sortedNews = [...this.allNews].sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  
      // Pega as 5 primeiras notícias
      this.latestNews = sortedNews.slice(0, 6);
    }
}
