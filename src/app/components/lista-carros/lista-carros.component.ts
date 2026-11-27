import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-carros',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './lista-carros.component.html',
  styleUrl: './lista-carros.component.css'
})
export class ListaCarrosComponent {}