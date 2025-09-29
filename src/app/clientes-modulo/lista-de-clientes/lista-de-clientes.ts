import { Component, OnInit } from '@angular/core';

//Servicio
import { ClientesServicio  } from '../clientes-servicio';

import { CommonModule } from '@angular/common';

//Interfaz
import { Cliente } from '../cliente.model';

//api
import { ApiUsuarios } from '../api-usuarios';

@Component({
  selector: 'app-lista-de-clientes',
  imports: [ CommonModule],
  templateUrl: './lista-de-clientes.html',
  styleUrl: './lista-de-clientes.css'
})
export class ListaDeClientes implements OnInit{

  clientes: Cliente[]= []

  constructor(private clientesServicio: ClientesServicio, private apiUsuarios: ApiUsuarios){}

  ngOnInit(): void {

    this.clientesServicio.getCliente().subscribe(
      data => {
        this.clientes = data
        console.log(this.clientes)
      },
      error => {
        console.log('Hay un error con los clientes', error)
      }
    )
    
  }


}
