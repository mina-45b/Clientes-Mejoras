import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

//Librerias
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Libreria de formularios
import { ReactiveFormsModule } from '@angular/forms';

//Servicio
import { ClientesServicio } from '../clientes-servicio';

//Interfaz
import { Cliente } from '../cliente.model';

//api
import { ApiUsuarios } from '../api-usuarios';

@Component({
  selector: 'app-crear-cliente',
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './crear-cliente.html',
  styleUrl: './crear-cliente.css'
})

export class CrearCliente implements OnInit {

  clientForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private clientesServicio : ClientesServicio,
    apiUsuarios: ApiUsuarios){}

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })

  }

  crearCliente() {
    if(this.clientForm.valid) {
      const datos: Omit<Cliente, 'id'> = this.clientForm.value;

      this.clientesServicio.crearCliente(datos);

      console.log('Cliente creado', datos);
      this.clientForm.reset();


    }


  }

}
