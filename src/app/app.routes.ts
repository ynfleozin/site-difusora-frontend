import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: 'Difusora Colatina',
    pathMatch: 'full'
  },
  {
    path: "noticia/:slug",
    component: NewsComponent,
    title: 'Notícia - Difusora Colatina'
  }

];
