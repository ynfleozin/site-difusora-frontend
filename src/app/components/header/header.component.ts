import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showPlayer = false;
  isPlaying = false;

  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;

  openPlayer() {
    this.showPlayer = true;
    this.playAudio();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audioRef.nativeElement.pause();
      this.isPlaying = false;
    } else {
      this.playAudio();
    }
  }

  private playAudio() {
    const audio = this.audioRef.nativeElement;
    audio
      .play()
      .then(() => {
        this.isPlaying = true;
      })
      .catch((error) => {
        console.error('Erro ao tentar reproduzir o áudio:', error);
        this.isPlaying = false;
      });
  }

  closePlayer() {
    this.audioRef.nativeElement.pause();
    this.showPlayer = false;
    this.isPlaying = false;
  }
}
