import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../services/news.service';
import { BannerService } from '../../services/banner.service';
import { LiveStreamService } from '../../services/live-stream.service'; // import novo
import { Banner } from '../../models/banner.model';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Editor } from 'ngx-editor';
import { NgxEditorModule } from 'ngx-editor';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxEditorModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit, OnDestroy {
  private newsService = inject(NewsService);
  private bannerService = inject(BannerService);
  private liveStreamService = inject(LiveStreamService); // injetei aqui
  private http = inject(HttpClient);

  public banners: WritableSignal<Banner[]> = signal([]);
  public newsForm: FormGroup;
  public editor: Editor;

  public liveLinkControl = new FormControl('', Validators.required);

  private selectedFile: File | null = null;

  constructor() {
    this.editor = new Editor();

    this.newsForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.loadBanners();
    this.loadLiveLink();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
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

  loadLiveLink(): void {
    this.liveStreamService.getLiveLink().subscribe({
      next: (res) => {
        if (res.liveLink) {
          this.liveLinkControl.setValue(res.liveLink);
          console.log('Link da live carregado:', res.liveLink);
        }
      },
      error: (err) => {
        console.error('Erro ao carregar link da live', err);
      },
    });
  }

  saveLiveLink(): void {
    if (!this.liveLinkControl.value) {
      alert('Por favor, insira o link da live.');
      return;
    }

    this.liveStreamService.setLiveLink(this.liveLinkControl.value).subscribe({
      next: () => {
        alert('Link da live salvo com sucesso!');
      },
      error: (err) => {
        alert('Erro ao salvar link da live.');
        console.error(err);
      },
    });
  }

  removeLiveLink(): void {
    this.liveStreamService.removeLiveLink().subscribe({
      next: () => {
        alert('Link da live removido!');
        this.liveLinkControl.reset();
      },
      error: (err) => {
        alert('Erro ao remover link da live.');
        console.error(err);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Arquivo selecionado:', this.selectedFile.name);
    }
  }

  onBannerFileSelected(event: Event, bannerID: string): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    const cloudName = 'dek2l41ss';
    const uploadPreset = 'portal-noticias';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    this.http.post<any>(url, formData).subscribe({
      next: (uploadResponse) => {
        const imageUrl = uploadResponse.secure_url;

        this.bannerService.updateBannerImage(bannerID, imageUrl).subscribe({
          next: () => {
            alert(`Banner ${bannerID} atualizado com sucesso!`);
            this.loadBanners();
          },
          error: (err) => {
            console.error(err);
            alert('Falha ao atualizar o banner.');
          },
        });
      },
      error: (err) => {
        console.error(err);
        alert('Falha no upload da imagem.');
      },
    });
  }

  onSubmitNews(): void {
    if (this.newsForm.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (!this.selectedFile) {
      alert('Por favor, selecione uma imagem para a notícia.');
      return;
    }

    this.newsForm.disable();

    const cloudName = 'dek2l41ss';
    const uploadPreset = 'portal-noticias';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('upload_preset', uploadPreset);

    this.http
      .post<any>(url, formData)
      .pipe(
        switchMap((uploadResponse) => {
          const imageUrl = uploadResponse.secure_url;
          const slug = this.newsForm.value.title
            .toLowerCase()
            .replace(/\s+/g, '-');
          const newsData = {
            ...this.newsForm.value,
            slug,
            imageUrl,
            publishedAt: new Date(),
          };
          return this.newsService.addNews(newsData);
        })
      )
      .subscribe({
        next: () => {
          alert('Notícia adicionada com sucesso!');
          this.newsForm.reset();
          this.selectedFile = null;
          const fileInput = document.getElementById(
            'imageFile'
          ) as HTMLInputElement;
          if (fileInput) fileInput.value = '';
          this.newsForm.enable();
        },
        error: (err) => {
          alert(
            'Falha ao adicionar notícia. Verifique o console para mais detalhes.'
          );
          console.error(err);
          this.newsForm.enable();
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
