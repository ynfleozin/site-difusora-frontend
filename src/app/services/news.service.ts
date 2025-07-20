import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsArticle } from '../models/news-article.model';
import { LocalNews } from '../models/local-news.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private readonly apiUrl = 'http://localhost:3001/api/news';

  private http = inject(HttpClient);

  constructor() {}

  addNews(newsData: LocalNews): Observable<any> {
    console.log('Enviando para o backend...', newsData);
    return this.http.post(this.apiUrl, newsData);
  }

  getLocalNews(): Observable<NewsArticle[]> {
    return this.http.get<NewsArticle[]>(`${this.apiUrl}/local`);
  }

  getNewsByCategory(category: string): Observable<NewsArticle[]> {
    return this.http.get<NewsArticle[]>(`${this.apiUrl}/category/${category}`);
  }

  getAllNews(): Observable<NewsArticle[]> {
    return this.http.get<NewsArticle[]>(this.apiUrl);
  }

  getNewsBySlug(slug: string): Observable<NewsArticle> {
    return this.http.get<NewsArticle>(`${this.apiUrl}/${slug}`);
  }
}
