import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsArticle } from '../../models/news-article.model';
import { Subscription } from 'rxjs';
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
      this.categoryName = params.get('categoryName');
      if (this.categoryName) {
        this.loadNewsByCategory(this.categoryName);
      } else {
        this.error = 'Categoria não especificada na URL.';
        this.isLoading = false;
      }
    });
  }

  loadNewsByCategory(category: string): void {
    this.isLoading = true;
    this.error = null;
    this.newsSubscription = this.newsService
      .getNewsByCategory(category)
      .subscribe({
        next: (news) => {
          this.filteredNews = news;
          this.isLoading = false;

          if(news && news.length > 0){
            this.categoryName = news[0].category;
          }
        },
        error: (err) => {
          console.error('Erro ao carregar notícias por categoria.', err);
          this.error =
            'Não foi possível carregar as notícias para esta categoria. Tente novamente.';
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
