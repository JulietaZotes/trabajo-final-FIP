import { Especies } from "./especies";
import { Cliente } from "./cliente";
import { fileManager } from "./fileManager";
import { Proveedor } from "./proveedor";
import { randomUUID as uuid } from "node:crypto";
import * as rls from "readline-sync";
import { v4 as uuidv4 } from 'uuid';



export class Veterinaria {
  private direccion: string;
  private nombre: string;
  private telefono: number;
  private id: string;
  private especies: Especies[];
  private clientes: Cliente[];
  private proveedores: Proveedor[];

  public constructor(nombre: string, direccion: string, telefono: number, id: string) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
    this.id = id;
    this.especies = [];
    this.clientes = [];
    this.proveedores = [];
  };

  public addPaciente(paciente: Especies): void {
    this.especies.push(paciente);
    fileManager.appendPacientes(this.especies);
  }

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

