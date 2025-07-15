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
    setTimeout(() => this.audioRef?.nativeElement.play());
    this.isPlaying = true;
  }

  togglePlay() {
    const audio = this.audioRef.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  closePlayer() {
    this.audioRef.nativeElement.pause();
    this.showPlayer = false;
    this.isPlaying = false;
  }
}
