import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NewsArticle } from '../../models/news-article.model';
import { NewsCardComponent } from '../news-card/news-card.component';
import { MOCK_NEWS } from '../../../../public/assets/mock-news';

@Component({
  selector: 'app-news-feed',
  standalone: true,
  imports: [NewsCardComponent],
  templateUrl: './news-feed.component.html',
  styleUrl: './news-feed.component.scss',
})
export class NewsFeedComponent implements OnChanges, OnInit {
  @Input() allNews: NewsArticle[] = [];

  latestNews: NewsArticle[] = [];
  categorizedNews: Map<string, NewsArticle[]> = new Map();

  private readonly categories: string[] = [
    'Cultura',
    'Direitos Humanos',
    'Economia',
    'Educação',
    'Esportes',
    'Internacional',
    'Justiça',
    'Meio Ambiente',
    'Política',
    'Saúde',
  ];

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
    const newsForCategorization = sortedNews.slice(6);

    const categoryMap = new Map<string, NewsArticle[]>();

    this.categories.forEach((category) => categoryMap.set(category, []));
    categoryMap.set('Geral', []);

    newsForCategorization.forEach((news) => {
      const category = news.category?.trim();

      // Verifica categoria
      const matchedCategory = this.categories.find(
        (c) => c.toLowerCase() === category?.toLowerCase()
      );

      const finalCategory = matchedCategory ?? 'Geral';

      if (!categoryMap.has(finalCategory)) {
        categoryMap.set(finalCategory, []);
      }
      categoryMap.get(finalCategory)!.push(news);
    });

    this.categorizedNews = categoryMap;
  }

  get categorizedNewsArray(): [string, NewsArticle[]][] {
    return Array.from(this.categorizedNews.entries());
  }
}
