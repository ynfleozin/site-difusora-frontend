import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from '../news-card/news-card.component';

interface NewsItem {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
}

@Component({
  selector: 'app-local-news',
  standalone: true,
  imports: [CommonModule, NewsCardComponent],
  templateUrl: './local-news.component.html',
  styleUrls: ['./local-news.component.scss'],
})
export class LocalNewsComponent {
  fakeNewsData: NewsItem[] = [
    {
      id: '1',
      category: 'Multilateralismo',
      title: 'Lula diz que Brics é fiador de um futuro promissor',
      description:
        'Para ele, cabe às nações emergentes reformar o financiamento mundial. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrl:
        'https://placehold.co/600x400/E0E0E0/333333?text=Imagem+Principal',
      slug: 'Lula-diz-que-brics-e-fiador-de-um-futuro-promissor',
    },
    {
      id: '2',
      category: 'Outras Notícias',
      title: 'Brics vive impasses sobre Irã, Palestina e Conselho de Segurança',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://placehold.co/300x200/E0E0E0/333333?text=Notícia+1',
      slug: '',
    },
    {
      id: '3',
      category: 'Outras Notícias',
      title:
        'China e Rússia não terão seus presidentes presentes na Cúpula do Brics',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://placehold.co/300x200/E0E0E0/333333?text=Notícia+2',
      slug: '',
    },
    {
      id: '4',
      category: 'Outras Notícias',
      title:
        'Rio terá ponto facultativo na segunda-feira devido à Cúpula do Brics',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://placehold.co/300x200/E0E0E0/333333?text=Notícia+3',
      slug: '',
    },
    {
      id: '5',
      category: 'Direitos Humanos',
      title: 'Lei acaba com atenuantes para crimes sexuais contra mulheres',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      imageUrl: 'https://placehold.co/300x200/E0E0E0/333333?text=Notícia+4',
      slug: '',
    },
  ];

  featuredNews = this.fakeNewsData[0];
  regularNews = this.fakeNewsData.slice(1);
}
