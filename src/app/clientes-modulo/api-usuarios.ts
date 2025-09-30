import { Injectable } from '@angular/core';

//http
import { HttpClient } from '@angular/common/http';

//observable
import { Observable } from 'rxjs';

//Interfaz
import { Cliente } from './cliente.model';

@Injectable({
  providedIn: 'root'
})

/*
Servicio Api de FakeStore Api Usuarios, 
contiene los métodos de obtener lista de usuarios y crear clientes en la api
*/
export class ApiUsuarios {

  private apiUrl = 'https://fakestoreapi.com/users'

  constructor(private http: HttpClient) {}

  getListaClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl)
  }

  createCliente(cliente:Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.apiUrl, cliente)
  }

  
}
