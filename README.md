# Proyecto de Gestión de Clientes con Angular + FakeStore API

Este proyecto es una aplicación desarrollada en **Angular** para la gestión de clientes.
En esta nueva versión, se ha implementado la integración con la API **[FakeStoreAPI Users](https://fakestoreapi.com/docs#tag/Users)**, lo que permite obtener clientes desde el inicio y simular la creación de nuevos usuarios a través de la API.

---

## Características principales

* **Integración con FakeStoreAPI**

  * Al listar clientes, la aplicación **carga los datos iniciales desde la API** y los guarda en un **array local**.
  * Al crear un cliente, se **simula un POST a la API** y se añade también al array local.

* **Modelo actualizado**
  El modelo de cliente se ha adaptado al esquema de la API:

  ```ts
  export interface Cliente {
      id: number;
      name: {
          firstname: string;
          lastname: string;
      };
      email: string;
      address: {
          city: string;
          street: string;
          number: number;
      };
      password: string;
  }
  ```

* **Servicio de API (`api-usuarios.ts`)**

  * `getListaClientes()`: obtiene la lista de clientes desde FakeStore API.
  * `createCliente(cliente: Cliente)`: simula la creación de un cliente en la API.

* **Servicio de Clientes (`clientes-service.ts`)**

  * Utiliza un **BehaviorSubject** para mantener el estado de los clientes localmente.
  * `cargarClientes()`: llama a la API y carga los clientes en el BehaviorSubject.
  * `agregarCliente(clienteDatos: Omit<Cliente, 'id' | 'password'>)`: simula el POST en la API, asigna **ID** y **password** (requeridos por el esquema) y lo almacena en el array local.

* **Componentes principales**

  * `clientes-modulo/lista-de-clientes`: obtiene los clientes del `BehaviorSubject` como `Observable` y los muestra en una tabla.
  * `clientes/crear-cliente`: llama al servicio para agregar un nuevo cliente, formateando los datos según el modelo de la API.

* **Diseño CSS**
  Se han mantenido los estilos básicos en los componentes.

---

## 📂 Estructura principal del proyecto

```
src/app/
 └── clientes-modulo/
      ├── crear-cliente/
      │    └── crear-cliente.component.ts|html|css
      ├── lista-de-clientes/
      │    └── listar-clientes.component.ts|html|css
      ├── clientes-modulo-module.ts
      ├── cliente.model.ts (interfaz adaptada al esquema de la API)
      ├── clientes-servicio.ts (maneja BehaviorSubject y API)
      └── api-usuarios.ts (consumo de FakeStore API)
```

---

## Ejecución del proyecto

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tuusuario/tu-repo.git
   cd tu-repo
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**

   ```bash
   ng serve
   ```

   Luego abre en tu navegador: **[http://localhost:4200](http://localhost:4200)**

---

## Pruebas unitarias

Ejecutar los tests con el siguiente comando:

```bash
ng test
```

* Se mantienen pruebas en el servicio para verificar que se puede **crear un cliente** correctamente.



