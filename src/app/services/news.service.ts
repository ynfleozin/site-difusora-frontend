import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsArticle } from '../models/news-article.model';
import { MOCK_NEWS } from '../../../public/assets/mock-news';
import { LocalNews } from '../models/local-news.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor() {}

  addNews(newsData: LocalNews): Observable<any> {
    console.log('Enviando para o backend...', newsData);

    return of({ sucess: true, data: newsData });
  }

  getNewsByCategory(category: string): Observable<NewsArticle[]> {
    const filtered = MOCK_NEWS.filter(
      (news) => news.category?.toLowerCase() === category.toLowerCase()
    );
    return of(filtered);
  }

  getAllNews(): Observable<NewsArticle[]> {
    return of(MOCK_NEWS);
  }
}
