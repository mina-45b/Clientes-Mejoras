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

//Material para barra de aviso
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-cliente',
  imports: [ ReactiveFormsModule, CommonModule],
  templateUrl: './crear-cliente.html',
  styleUrl: './crear-cliente.css'
})

export class CrearCliente implements OnInit {

  clientForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private clientesServicio : ClientesServicio, private snackBar: MatSnackBar){}

  ngOnInit() {

    //Crea el formualrio y las respectivas validaciones
    this.clientForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })

  }

  /*
  Crea el cliente si el formulario es válido.
  Obtiene los datos del cliente (ignorando Id y Password que son asignados) y los maqueta para adaptarlos al modelo,
  Llama al método agregarCliente() y le pasa los datos maquetados, genera una snackBar para notificar la creación del cliente,
  reinicia el formulario
  */
  crearCliente() {
    if(this.clientForm.valid) {
      const formValue = this.clientForm.value;

      const datos: Omit<Cliente, 'id' | 'password'> = {
        name: {
          firstname: formValue.nombre,
          lastname: ''
        },
        email: formValue.email,
        address: {
          city: '',
          street: formValue.direccion,
          number: 0
        }
      }

      this.clientesServicio.agregarCliente(datos);

      this.snackBar.open('cliente añadido con éxito', 'cerrar',{
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });

      console.log('Cliente creado', datos);
      this.clientForm.reset();

    }
  }

}
