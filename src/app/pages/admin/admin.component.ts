import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { BannerService } from '../../services/banner.service';
import { Banner } from '../../models/banner.model';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  private newsService = inject(NewsService);
  private bannerService = inject(BannerService);

  public banners: WritableSignal<Banner[]> = signal([]);
  public newsForm: FormGroup;

  constructor() {
    this.newsForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadBanners();
  }

  loadBanners(): void {
    this.bannerService.getBanners().subscribe({
      next: (data) => {
        this.banners.set(data);
        console.log('Banners carregados:', this.banners());
      },
      error: (err) => {
        console.error('Falha ao carregar banners:', err);
      },
    });
  }

  onSubmitNews(): void {
    if (this.newsForm.invalid) {
      alert('Por favor, preencha o formulário corretamente.');
      return;
    }

    const slug = this.newsForm.value.title.toLowerCase().replace(/\s+/g, '-');
    const newsData = { ...this.newsForm.value, slug, publishedAt: new Date() };

    this.newsService.addNews(newsData).subscribe({
      next: () => {
        alert('Notícia adicionada com sucesso!');
        this.newsForm.reset();
      },
      error: (err) => {
        alert('Falha ao adicionar notícia');
        console.error(err);
      },
    });
  }

  onUpdateBanner(bannerID: string, inputElement: HTMLInputElement): void {
    const newImageUrl = inputElement.value;
    if (!newImageUrl) {
      alert('Por favor, insira a nova URL da imagem.');
      return;
    }

    this.bannerService.updateBannerImage(bannerID, newImageUrl).subscribe({
      next: () => {
        alert(`Banner ${bannerID} atualizado!`);
        inputElement.value = '';
        this.loadBanners();
      },
      error: (err) => {
        alert('Falha ao atualizar o banner.');
        console.error(err);
      },
    });
  }
}
