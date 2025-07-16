import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsArticle } from '../models/news-article.model';
import { MOCK_NEWS } from '../../../public/assets/mock-news';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  constructor() { }

  getNewsByCategory(category: string): Observable<NewsArticle[]>{
    const filtered = MOCK_NEWS.filter(
      news => news.category?.toLowerCase() === category.toLowerCase()
    );
    return of(filtered);
  }

  getAllNews(): Observable<NewsArticle[]>{
    return of(MOCK_NEWS);
  }
}
