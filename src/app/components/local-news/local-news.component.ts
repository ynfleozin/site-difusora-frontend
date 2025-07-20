import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from '../news-card/news-card.component';
import { NewsService } from '../../services/news.service';
import { NewsArticle } from '../../models/news-article.model';

@Component({
  selector: 'app-local-news',
  standalone: true,
  imports: [CommonModule, NewsCardComponent],
  templateUrl: './local-news.component.html',
  styleUrls: ['./local-news.component.scss'],
})
export class LocalNewsComponent implements OnInit {
  private newsService = inject(NewsService);

  featuredNews?: NewsArticle;
  regularNews: NewsArticle[] = [];
  isLoading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadLocalNews();
  }

  loadLocalNews(): void {
    this.isLoading = true;
    this.error = null;

    this.newsService.getLocalNews().subscribe({
      next: (news) => {
        if (news && news.length > 0) {
          this.featuredNews = news[0];
          this.regularNews = news.slice(1);
        } else {
          this.featuredNews = undefined;
          this.regularNews = [];
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar notícias locais:', err);
        this.error =
          'Não foi possível carregar as notícias locais. Tente novamente mais tarde.';
        this.isLoading = false;
      },
    });
  }
}
