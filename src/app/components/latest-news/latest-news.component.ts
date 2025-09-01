import { Component, inject, OnInit } from '@angular/core';
import { NewsCardComponent } from '../news-card/news-card.component';
import { NewsArticle } from '../../models/news-article.model';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [NewsCardComponent, CommonModule],
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss'],
})
export class LatestNewsComponent implements OnInit {
  latestNews: NewsArticle[] = [];
  isLoading = true;

  private newsService = inject(NewsService);

  ngOnInit(): void {
    this.loadLatestNews();
  }

  private loadLatestNews(): void {
    this.isLoading = true;

    this.newsService.getLatestNews().subscribe({
      next: (newsFromApi) => {
        this.latestNews = newsFromApi.slice(0, 6);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar notícias:', err);
        this.latestNews = [];
        this.isLoading = false;
      },
    });
  }
}
