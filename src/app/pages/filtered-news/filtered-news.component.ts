// Importe o HostBinding
import { Component, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { NewsArticle } from '../../models/news-article.model';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { CommonModule, Location } from '@angular/common';
import { NewsCardComponent } from '../../components/news-card/news-card.component';

@Component({
  selector: 'app-filtered-news',
  standalone: true,
  imports: [CommonModule, NewsCardComponent],
  templateUrl: './filtered-news.component.html',
  styleUrl: './filtered-news.component.scss',
})
export class FilteredNewsComponent implements OnInit, OnDestroy {
  @HostBinding('class.is-loading') get loadingClass() {
    return this.isLoading;
  }

  categoryName: string | null = null;
  filteredNews: NewsArticle[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  private routeSubscription: Subscription | undefined;
  private newsSubscription: Subscription | undefined;

  private categoryDisplayNames: { [key: string]: string } = {
    cultura: 'Cultura',
    'direitos-humanos': 'Direitos Humanos',
    economia: 'Economia',
    educacao: 'Educação',
    esportes: 'Esportes',
    geral: 'Geral',
    internacional: 'Internacional',
    justica: 'Justiça',
    'meio-ambiente': 'Meio Ambiente',
    politica: 'Política',
    saude: 'Saúde',
    local: 'Local',
  };

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params) => {
      const categorySlug = params.get('categoryName');
      this.isLoading = true;
      this.filteredNews = [];
      this.error = null;

      if (categorySlug) {
        this.categoryName =
          this.categoryDisplayNames[categorySlug.toLowerCase()] ||
          this.capitalizeFirstLetter(categorySlug);
        this.loadNews(categorySlug);
      } else {
        this.error = 'Categoria não especificada na URL.';
        this.isLoading = false;
        this.categoryName = 'Categoria Desconhecida';
      }
    });
  }

  loadNews(categorySlug: string): void {
    let newsObservable: Observable<NewsArticle[]>;

    if (categorySlug.toLowerCase() === 'local') {
      newsObservable = this.newsService.getLocalNews();
    } else {
      newsObservable = this.newsService.getNewsByCategory(categorySlug);
    }

    this.newsSubscription = newsObservable.subscribe({
      next: (news) => {
        this.filteredNews = news;
        this.isLoading = false;
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

  goBack(): void {
    this.location.back();
  }

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).replace(/-/g, ' ');
  }
}
