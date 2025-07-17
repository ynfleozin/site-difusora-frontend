import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FilteredNewsComponent } from './pages/filtered-news/filtered-news.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Difusora Colatina',
    pathMatch: 'full',
  },
  {
    path: 'noticia/:slug',
    component: NewsComponent,
    title: 'Notícia - Difusora Colatina',
  },
  {
    path: 'categorias/:categoryName',
    component: FilteredNewsComponent,
    title: 'Difusora Colatina',
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Painel de Controle',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Página não encontrada',
  },
];
