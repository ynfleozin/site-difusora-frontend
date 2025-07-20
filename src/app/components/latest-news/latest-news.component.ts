import { Component, inject, OnChanges, OnInit } from '@angular/core';
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
    this.newsService.getAllNews().subscribe({
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
    const sortedNews = [...allNews].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    this.latestNews = sortedNews.slice(0, 6);
  }
}
