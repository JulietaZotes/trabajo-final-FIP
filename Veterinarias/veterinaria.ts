import { Especies } from "./especies";
import { Perros } from "./perros";
import { Gatos } from "./gatos";
import { Exoticos } from "./exoticos";
import * as rls from "readline-sync";
import { Cliente } from "./cliente";
import { fileManager } from "./fileManager";
import { log } from "console";

export class Veterinaria {
  private direccion:string;
  private nombre:string;
  private telefono:number;
  private especies: Especies[];
  private clientes: Cliente[];
  public constructor(nombre:string,direccion:string, telefono:number) {
      this.nombre = nombre;
      this.direccion = direccion;
      this.telefono = telefono;
      this.especies = [];
      this.clientes = [];
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

  public addCliente(newCliente: Cliente){

    this.clientes.push(newCliente);
    fileManager.readClientes();
    fileManager.appendClientes(this.clientes);
  }

  //async es una palabra clave que se utiliza para declarar una función asincrónica. Una función asincrónica es una función que realiza operaciones asincrónicas, como operaciones de lectura/escritura de archivos.
  public showClientes(){
    const readResult = fileManager.readClientes(); //
    if(readResult){
      console.log("\n------Clientes------\n");
      if(!this.clientes.length){
        console.log("No se encontraron clientes.\n");
      } else {
        this.clientes.forEach((cliente) => {
          console.log(`
          ID: ${cliente.Getid()}
          Nombre: ${cliente.GetNombreCliente()}
          Telefono: ${cliente.GetTelefonoCliente()}
          VIP: ${cliente.isVIP()}
          ------
          `);     
        });
      } 
    }
  }
}

const vete01 = new Veterinaria("vete 1", "av123", 1223444);
// const perro01 = new Perros("golden", "macho", "3 meses");
// const exotico01 = new Exoticos("piton", "macho", "10 años", "vibora")
// vete01.addPaciente(perro01);
// vete01.addPaciente(exotico01);

const cliente01 = new Cliente("Ana Rodriguez", 123456);
vete01.addCliente(cliente01);
vete01.showClientes();