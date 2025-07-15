import { Component, OnInit } from '@angular/core';
import { NewsArticle } from '../../models/news-article.model';
import { ActivatedRoute } from '@angular/router';
import { MOCK_NEWS } from '../../../../public/assets/mock-news';
import { DatePipe, CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent implements OnInit {
  noticia?: NewsArticle;
  outrasNoticias: NewsArticle[] = [];

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.noticia = MOCK_NEWS.find((n) => n.slug === slug);

      const outras = MOCK_NEWS.filter((n) => n.slug !== slug);
      this.outrasNoticias = this.shuffle(outras).slice(0, 3);
    }
  }

  goBack() {
    this.location.back();
  }

  shuffle(array: NewsArticle[]): NewsArticle[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  shareWhatsApp() {
    const url = window.location.href;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
      '_blank'
    );
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copiado para a área de transferência!');
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src =
      'https://placehold.co/800x400/E0E0E0/333333?text=Imagem+Indisponível';
  }
}
