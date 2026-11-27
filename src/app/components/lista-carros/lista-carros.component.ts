import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CarroService } from '../../services/carro.services';
import { Carro } from '../../carro';

@Component({
  selector: 'app-lista-carros',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CurrencyPipe
  ],
  templateUrl: './lista-carros.component.html',
  styleUrl: './lista-carros.component.css'
})
export class ListaCarrosComponent implements OnInit {
  private carroService = inject(CarroService);

  colunas: string[] = ['id', 'name', 'description', 'price', 'category', 'acoes'];
  carros: Carro[] = [];

  busca = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.carregar();

    this.busca.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.carregar());
  }

  carregar(): void {
    this.carroService.listar(1, 100, this.busca.value, '', '').subscribe({
      next: (resposta) => {
        this.carros = resposta.body ?? [];
      },
      error: (erro) => {
        console.error('Erro ao carregar carros', erro);
      }
    });
  }
}