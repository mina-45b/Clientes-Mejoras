import { Injectable } from '@angular/core';

//Observable
import { BehaviorSubject } from 'rxjs';

//Interfaz
import { Cliente } from './cliente.model';

//api
import { ApiUsuarios } from './api-usuarios';

@Injectable({
  providedIn: 'root'
})

/*
Clase que se encarga de conectar los componentes con la api y gestionar la creación y listado de clientes
*/

export class ClientesServicio {
  
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  clientes$ = this.clientesSubject.asObservable();

  //Instancia del servicio api
  constructor(private apiUsuarios: ApiUsuarios) {}

  //Carga los clientes de la api por primera vez y los almacena en el array local
  cargarclientes() {
    if (this.clientesSubject.getValue().length === 0) {
      this.apiUsuarios.getListaClientes().subscribe(
      (usuarios) => {
        this.clientesSubject.next(usuarios);
      },
      (error) => {
        console.error('Error al cargar clientes', error)
      }
    );
    }
  }

  //Omit<T, K> Tengo todo de cliente menos el Id y Password
  /*
  Obtiene los clientes existentes y crea una instancia del cliente nuevo, le asigna un Id y un password aleatorio (obligatorio en el esquema de la api).
  Llama al método createcliente(), le pasa el nuevo cliente y actualiza los clientes existentes
  */
  agregarCliente(clienteDatos: Omit<Cliente, 'id' | 'password'>): void {

    const clientesActuales = this.clientesSubject.getValue();

    const nuevoCliente: Cliente = {
      id: clientesActuales.length + 1,
      ...clienteDatos,
       password: Math.random().toString(36).slice(-8)

    }
    
    this.apiUsuarios.createCliente(nuevoCliente).subscribe(
    () => {
      this.clientesSubject.next([...clientesActuales, nuevoCliente])
    },
  (error) => console.error('Error al crear cliente', error)
);
}
  

}
