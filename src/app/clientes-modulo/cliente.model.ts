/*
Modelo de Cliente en base al esquema de la api
*/

export interface Cliente {
    id: number;
    name: {
        firstname: string;
        lastname: String;
    }
    email: string;
    address: {
        city: String;
        street: String;
        number: Number
    }
    password: String;
}