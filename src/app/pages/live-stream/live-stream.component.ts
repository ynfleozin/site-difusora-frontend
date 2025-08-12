import { Component, OnInit } from '@angular/core';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-live-stream',
  standalone: true,
  imports: [SafeUrlPipe],
  templateUrl: './live-stream.component.html',
  styleUrl: './live-stream.component.scss',
})
export class LiveStreamComponent implements OnInit {
  liveLink: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ liveLinkEmbed: string | null }>(
        'https://site-difusora-backend.onrender.com/api/live-stream'
      )
      .subscribe({
        next: (res) => {
          this.liveLink = res.liveLinkEmbed;
        },
        error: (err) => {
          console.error('Erro ao carregar link da live', err);
          this.liveLink = null;
        },
      });
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
