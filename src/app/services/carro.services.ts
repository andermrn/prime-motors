import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../carro';

@Injectable({
  providedIn: 'root'
})
export class CarroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/products';

  // GET /products (com busca, paginação e ordenação)
  listar(
    pagina: number,
    porPagina: number,
    busca: string,
    ordenarPor: string,
    direcao: string
  ): Observable<HttpResponse<Carro[]>> {
    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', porPagina);

    if (busca) {
      params = params.set('q', busca);
    }
    if (ordenarPor && direcao) {
      params = params.set('_sort', ordenarPor).set('_order', direcao);
    }

    return this.http.get<Carro[]>(this.apiUrl, { params, observe: 'response' });
  }

  // POST /products
  criar(carro: Carro): Observable<Carro> {
    return this.http.post<Carro>(this.apiUrl, carro);
  }

  // PUT /products/:id
  atualizar(id: number, carro: Carro): Observable<Carro> {
    return this.http.put<Carro>(`${this.apiUrl}/${id}`, carro);
  }

  // DELETE /products/:id
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}