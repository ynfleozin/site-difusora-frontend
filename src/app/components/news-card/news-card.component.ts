import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent {
  @Input() category: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() isFeatured: boolean = false;

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.isFeatured ? 'https://placehold.co/600x400/E0E0E0/333333?text=Imagem+Indisponível' : 'https://placehold.co/300x200/E0E0E0/333333?text=Imagem+Indisponível';
  }
}
