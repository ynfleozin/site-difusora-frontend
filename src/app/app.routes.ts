import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewsComponent } from './pages/news/news.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FilteredNewsComponent } from './pages/filtered-news/filtered-news.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './services/auth.guard';
import { LiveStreamComponent } from './pages/live-stream/live-stream.component';
import { HistoryComponent } from './pages/history/history.component';
import { ContactComponent } from './pages/contact/contact.component';

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
    path: 'assista-ao-vivo',
    component: LiveStreamComponent,
    title: 'Assista ao vivo - Difusora Colatina',
  },
  // {
  //   path: 'historia',
  //   component: HistoryComponent,
  //   title: 'Nossa História - Difusora Colatina',
  // },
  {
    path: 'fale-conosco',
    component: ContactComponent,
    title: 'Fale Conosco'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - Painel de Controle',
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Painel de Controle',
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Página não encontrada',
  },
];
