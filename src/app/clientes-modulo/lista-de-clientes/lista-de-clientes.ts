import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

//Servicio
import { ClientesServicio  } from '../clientes-servicio';

//Interfaz
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-lista-de-clientes',
  imports: [ CommonModule],
  templateUrl: './lista-de-clientes.html',
  styleUrl: './lista-de-clientes.css'
})
export class ListaDeClientes implements OnInit{

  clientes: Cliente[]= []

  constructor(private clientesServicio: ClientesServicio){}

  ngOnInit() {

    //Carga los clientes de la api
    this.clientesServicio.cargarclientes()

    //Obtiene la lista de clientes y los almacena en su array local
    this.clientesServicio.clientes$.subscribe(
      lista => {
        this.clientes = lista
        console.log(this.clientes)
      },
      error => {
        console.log('Hay un error con los clientes', error)
      }
    )

  
    
  }


}
