import { Especies } from "./especies";
import { Perros } from "./perros";
import { Gatos } from "./gatos";
import { Exoticos } from "./exoticos";
import * as rls from "readline-sync";
import { Cliente } from "./cliente";
import { fileManager } from "./fileManager";
import { log } from "console";
import { Proveedor } from "./proveedor";
import { randomUUID as uid } from "node:crypto";



export class Veterinaria {
  private direccion: string;
  private nombre: string;
  private telefono: number;
  private id: string;

  public constructor(nombre: string, direccion: string, telefono: number, id: string) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
    this.id = id;
  };

  public getId(): string {
    return this.id;
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

}