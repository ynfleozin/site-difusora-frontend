import { Component, inject, OnInit } from '@angular/core';
import { NewsCardComponent } from '../news-card/news-card.component';
import { NewsArticle } from '../../models/news-article.model';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [NewsCardComponent],
  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.scss',
})
export class LatestNewsComponent implements OnInit {
  latestNews: NewsArticle[] = [];

  private newsService = inject(NewsService);

  ngOnInit(): void {
    this.newsService.getLatestNews().subscribe({
      next: (newsFromApi) => {
        this.processNews(newsFromApi);
      },
      error: (err) => {
        console.error('Erro ao buscar notícias:', err);
        this.latestNews = [];
      },
    });
  }

  private processNews(allNews: NewsArticle[]): void {
    this.latestNews = allNews.slice(0, 6);
  }
}
