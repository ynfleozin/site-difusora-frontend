import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsArticle } from '../../models/news-article.model';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from '../../components/news-card/news-card.component';

@Component({
  selector: 'app-filtered-news',
  standalone: true,
  imports: [CommonModule, NewsCardComponent],
  templateUrl: './filtered-news.component.html',
  styleUrl: './filtered-news.component.scss',
})
export class FilteredNewsComponent implements OnInit, OnDestroy {
  categoryName: string | null = null;
  filteredNews: NewsArticle[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  private routeSubscription: Subscription | undefined;
  private newsSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const category = params.get('categoryName');
      if (category) {
        this.categoryName = category;
        this.loadNews(category);
      } else {
        this.error = 'Categoria não especificada na URL.';
        this.isLoading = false;
      }
    });
  }

  loadNews(category: string): void {
    this.isLoading = true;
    this.error = null;
    let newsObservable: Observable<NewsArticle[]>;

    if (category.toLowerCase() === 'local') {
      this.categoryName = 'Local';
      newsObservable = this.newsService.getLocalNews();
    } else {
      newsObservable = this.newsService.getNewsByCategory(category);
    }

    this.newsSubscription = newsObservable.subscribe({
      next: (news) => {
        this.filteredNews = news;
        this.isLoading = false;

        if (category.toLowerCase() !== 'local' && news && news.length > 0) {
          this.categoryName = news[0].category;
        }
      },
      error: (err) => {
        console.error('Erro ao carregar notícias.', err);
        this.error = 'Não foi possível carregar as notícias. Tente novamente.';
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.newsSubscription) {
      this.newsSubscription.unsubscribe();
    }
  }
}
