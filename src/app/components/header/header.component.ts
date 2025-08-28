import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  showPlayer = false;
  isPlaying = false;
  showDesktopCategories = false;
  showMobileCategories = false;

  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('menuToggle', { static: false }) menuToggle!: ElementRef;
  @ViewChild('mobileLinks', { static: false }) mobileLinks!: ElementRef;
  @ViewChild('menuOverlay', { static: false }) menuOverlay!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.menuToggle && this.mobileLinks && this.menuOverlay) {
        this.menuToggle.nativeElement.addEventListener('click', () => {
          this.mobileLinks.nativeElement.classList.toggle('open');
          this.menuOverlay.nativeElement.classList.toggle('show');

          if (!this.mobileLinks.nativeElement.classList.contains('open')) {
            this.showMobileCategories = false;
          }
        });

        this.menuOverlay.nativeElement.addEventListener('click', () => {
          this.mobileLinks.nativeElement.classList.remove('open');
          this.menuOverlay.nativeElement.classList.remove('show');
          this.showMobileCategories = false;
        });
      }

      document.addEventListener('click', this.onDocumentClick.bind(this));
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.onDocumentClick.bind(this));
    }
  }

  onDocumentClick(event: Event) {
    if (isPlatformBrowser(this.platformId) && event.target) {
      const target = event.target as HTMLElement;

      if (!target.closest('.nav-link.dropdown') && this.showDesktopCategories) {
        this.showDesktopCategories = false;
      }

      if (
        !target.closest('.menu-toggle') &&
        !target.closest('.mobile-links') &&
        (this.mobileLinks.nativeElement.classList.contains('open') ||
          this.showMobileCategories)
      ) {
        this.mobileLinks.nativeElement.classList.remove('open');
        this.menuOverlay.nativeElement.classList.remove('show');
        this.showMobileCategories = false;
      }
    }
  }

  toggleCategories(type: 'desktop' | 'mobile') {
    if (type === 'desktop') {
      this.showDesktopCategories = !this.showDesktopCategories;
      if (this.showDesktopCategories) {
        this.showMobileCategories = false;
      }
    } else {
      this.showMobileCategories = !this.showMobileCategories;
      if (this.showMobileCategories) {
        this.showDesktopCategories = false;
      }
    }
  }

  openPlayer() {
    this.showPlayer = true;
    this.playAudio();
    this.showDesktopCategories = false;
    this.showMobileCategories = false;
    if (
      this.mobileLinks &&
      this.menuOverlay &&
      this.mobileLinks.nativeElement.classList.contains('open')
    ) {
      this.mobileLinks.nativeElement.classList.remove('open');
      this.menuOverlay.nativeElement.classList.remove('show');
    }
  }

  togglePlay() {
    if (
      isPlatformBrowser(this.platformId) &&
      this.audioRef &&
      this.audioRef.nativeElement
    ) {
      if (this.isPlaying) {
        this.audioRef.nativeElement.pause();
        this.isPlaying = false;
      } else {
        this.playAudio();
      }
    }
  }

  private playAudio() {
    if (
      isPlatformBrowser(this.platformId) &&
      this.audioRef &&
      this.audioRef.nativeElement
    ) {
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
  }

  closePlayer() {
    if (
      isPlatformBrowser(this.platformId) &&
      this.audioRef &&
      this.audioRef.nativeElement
    ) {
      this.audioRef.nativeElement.pause();
    }
    this.showPlayer = false;
    this.isPlaying = false;
  }

  scrollToSection(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (this.mobileLinks && this.menuOverlay) {
        this.mobileLinks.nativeElement.classList.remove('open');
        this.menuOverlay.nativeElement.classList.remove('show');
        this.showMobileCategories = false;
      }
    }
  }
}
