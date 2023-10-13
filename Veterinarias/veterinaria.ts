import { Especies } from "./especies";
import { Perros } from "./perros";
import { Gatos } from "./gatos";
import { Exoticos } from "./exoticos";

export class Veterinaria {
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

