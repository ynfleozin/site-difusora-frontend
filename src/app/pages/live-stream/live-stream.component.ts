import { Component } from '@angular/core';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-live-stream',
  standalone: true,
  imports: [SafeUrlPipe],
  templateUrl: './live-stream.component.html',
  styleUrl: './live-stream.component.scss',
})
export class LiveStreamComponent {
  liveLink: string | null = null;

  constructor() {
    this.liveLink = 'https://www.youtube.com/embed/HuFYqnbVbzY';
  }

  shareLive() {
    const url = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: 'Assista à live da Difusora',
          text: 'Confira a transmissão ao vivo!',
          url: url,
        })
        .catch((err) => console.error('Erro ao compartilhar:', err));
    } else {
      navigator.clipboard
        .writeText(url)
        .then(() => alert('Link copiado para a área de transferência!'))
        .catch((err) => console.error('Erro ao copiar link:', err));
    }
  }
}
