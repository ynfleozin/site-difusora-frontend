import { Component, inject, OnInit } from '@angular/core';
import { DatePipe, CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NewsArticle } from '../../models/news-article.model';
import { NewsService } from '../../services/news.service';
import { forkJoin, switchMap, finalize } from 'rxjs'; // Importe 'finalize'
import { NewsCardComponent } from '../../components/news-card/news-card.component';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule, NewsCardComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent implements OnInit {
  news?: NewsArticle;
  otherNews: NewsArticle[] = [];

  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private newsService = inject(NewsService);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const slug = params.get('slug');
          this.news = undefined;

          if (slug) {
            return forkJoin({
              mainArticle: this.newsService.getNewsBySlug(slug),
              allNews: this.newsService.getAllNews(),
            });
          }
          return forkJoin({ mainArticle: [], allNews: [] });
        })
      )
      .subscribe({
        next: (result) => {
          this.news = result.mainArticle as NewsArticle;

          const others = (result.allNews as NewsArticle[]).filter(
            (n) => n.slug !== this.news?.slug
          );

          this.otherNews = this.shuffle(others).slice(0, 3);

          window.scrollTo(0, 0);
        },
        error: (err) => {
          console.error('Erro ao buscar a notícia:', err);
          this.news = undefined;
        },
      });
  }

  goBack(): void {
    this.location.back();
  }

  shuffle(array: NewsArticle[]): NewsArticle[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  shareWhatsApp(): void {
    const url = window.location.href;
    const text = `Confira esta notícia: ${this.news?.title}`;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        text + ' ' + url
      )}`,
      '_blank'
    );
  }

  copyLink(): void {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => alert('Link copiado para a área de transferência!'))
      .catch((err) => console.error('Falha ao copiar o link:', err));
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src =
      'https://placehold.co/800x400/E0E0E0/333333?text=Imagem+Indisponível';
  }
}
