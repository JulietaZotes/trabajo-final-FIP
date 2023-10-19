import { Especies } from "./especies";
import { Perros } from "./perros";
import { Gatos } from "./gatos";
import { Exoticos } from "./exoticos";

export class Veterinaria {
  private direccion:string;
  private nombre:string;
  private telefono:number;
  private especies: Especies[];
  public constructor(nombre:string,direccion:string, telefono:number) {
      this.nombre = nombre;
      this.direccion = direccion;
      this.telefono = telefono;
      this.especies = [];
    };
    
  public addPaciente(paciente: Especies){
    this.especies.push(paciente);
    console.log(this.especies);
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

const vete01 = new Veterinaria("vete 1", "av123", 1223444);
const perro01 = new Perros("golden", "macho", "3 meses");
const exotico01 = new Exoticos("piton", "macho", "10 años", "vibora")
vete01.addPaciente(perro01);
vete01.addPaciente(exotico01);