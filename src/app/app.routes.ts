import { Routes } from '@angular/router';
import { ListaCarrosComponent } from './components/lista-carros/lista-carros.component';

export const routes: Routes = [
  { path: '', redirectTo: 'carros', pathMatch: 'full' },
  { path: 'carros', component: ListaCarrosComponent }
];