<<<<<<< HEAD
import { Especies } from "./especies";
import { Perros } from "./perros";
import { Gatos } from "./gatos";
import { Exoticos } from "./exoticos";

export class EntidadVeterinaria {
  private direccion:string;
  private nombre:string;
  private telefono:number;
  private perros: Perros[];
  private gatos: Gatos[];
  private exoticos: Exoticos[];
  public constructor(nombre:string,direccion:string, telefono:number) {
      this.nombre = nombre;
      this.direccion = direccion;
      this.telefono = telefono;
      this.perros = [];
        this.gatos = [];
        this.exoticos = [];
    };
    }

  public getNombre(): string {
    return this.nombre;
  }

  public getDireccion(): string {
  return this.direccion;
  }

  public getTelefono(): number {
    return this.telefono;
  }

  public setNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre;
  }

  public setDireccion(nuevaDireccion: string): void {
    this.direccion = nuevaDireccion;
  }

  public setTelefono(nuevoTelefono: number): void {
    this.telefono = nuevoTelefono;
  }

  public mostrarInformacion(): void {
    console.log(`
    Nombre: ${this.nombre}
    Dirección: ${this.direccion} 
    Telefono: ${this.telefono}
    `);
  }
}
=======
import { randomUUID as uid } from "node:crypto";

export class Veterinaria {
  private direccion:string;
  private nombre:string;
  private telefono:number;
  public constructor(nombre:string,direccion:string, telefono:number) {
      this.direccion;
      this.nombre
    }
    
  public getNombre(): string {
    return this.nombre;
  }


  public getDireccion(): string {
  return this.direccion;
  }

  public setNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre;
  }

  public setDireccion(nuevaDireccion: string): void {
    this.direccion = nuevaDireccion;
  }
  public mostrarInformacion(): void {
    console.log(`Nombre: ${this.nombre}, Dirección: ${this.direccion}`);
  }

}


 /* public altaCliente(nombre: string, telefono: number): void {
    const nuevoCliente = {
      id: uid(),
      nombre,
      telefono,
      esVIP: false,
      visitas: 0,
    };
    this.clientes.push(nuevoCliente);
  }

  public bajaClientePorId(id: string): void {
    this.clientes = this.clientes.filter((cliente) => cliente.id !== id);
  }

  public modificarClientePorId(id: string, nuevoNombre: string, nuevoTelefono: number): void {
    this.clientes = this.clientes.map((cliente) => {
      if (cliente.id === id) {
        return {
          ...cliente,
          nombre: nuevoNombre,
          telefono: nuevoTelefono,
        };
      }
      return cliente;
    });
  }

  public marcarComoVIP(id: string): void {
    this.clientes = this.clientes.map((cliente) => {
      if (cliente.id === id) {
        if (cliente.visitas >= 5) {
          cliente.esVIP = true;
        }
        cliente.visitas++;
      }
      return cliente;
    });
  } 
  }
 */ 
>>>>>>> 248b5b8a8dea4504b2481b6ad6b57bd9da9286ba
