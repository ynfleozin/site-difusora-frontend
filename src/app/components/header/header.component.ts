import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  showPlayer = false;
  isPlaying = false;

  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('menuToggle', { static: false }) menuToggle!: ElementRef;
  @ViewChild('mobileLinks', { static: false }) mobileLinks!: ElementRef;
  @ViewChild('menuOverlay', { static: false }) menuOverlay!: ElementRef;

  ngAfterViewInit() {
    if (this.menuToggle && this.mobileLinks && this.menuOverlay) {
      this.menuToggle.nativeElement.addEventListener('click', () => {
        this.mobileLinks.nativeElement.classList.toggle('open');
        this.menuOverlay.nativeElement.classList.toggle('show');
      });

      this.menuOverlay.nativeElement.addEventListener('click', () => {
        this.mobileLinks.nativeElement.classList.remove('open');
        this.menuOverlay.nativeElement.classList.remove('show');
      });
    }
  }

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
