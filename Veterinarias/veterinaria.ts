import { Especies } from "./especies";
import { Perros } from "./perros";
import { Gatos } from "./gatos";
import { Exoticos } from "./exoticos";
import * as rls from "readline-sync";
import { Cliente } from "./cliente";
import { fileManager} from "./fileManager";
import { log } from "console";
import { Proveedor } from "./proveedor";

export class Veterinaria {
  private direccion:string;
  private nombre:string;
  private telefono:number;
  private especies: Especies[];
  private clientes: Cliente[];
  private proveedores: Proveedor[];
  public constructor(nombre:string,direccion:string, telefono:number) {
      this.nombre = nombre;
      this.direccion = direccion;
      this.telefono = telefono;
      this.especies = [];
      this.clientes = [];
      this.proveedores = [];
    };
    
  public addPaciente(paciente: Especies){
    this.especies.push(paciente);
    fileManager.readPacientes();
    fileManager.appendPacientes(this.especies);
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

  public agregarCliente(newCliente: Cliente){

    this.clientes.push(newCliente);
    fileManager.readClientes();
    fileManager.appendClientes(this.clientes);
  }
  public eliminarCliente (id: string): void {
    const indiceCliente = this.clientes.findIndex(nombreCliente => nombreCliente.Getid() === id);
    if (indiceCliente !== -1) {
      this.clientes.splice(indiceCliente, 1);
      console.log(`Cliente con ID ${id} eliminado con éxito.`);
    } else {
      console.log(`Cliente con ID ${id} no encontrado.`);
    }
  }
  public modificarCliente(id: string, nuevoNombre: string, nuevoTelefono: number): void {
    const cliente = this.clientes.find(cliente => cliente.Getid() === id);
  
    if (cliente) {
      cliente.SetNombreCliente(nuevoNombre);
      cliente.SetTelefonoCliente(nuevoTelefono);
      console.log(`Cliente con ID ${id} modificado con éxito.`);
    } else {
      console.log(`Cliente con ID ${id} no encontrado.`);
    }
  }
  

  public addProv(newProv: Proveedor){
    this.proveedores.push(newProv);
    fileManager.readClientes();
    fileManager.appendProveedores(this.proveedores);
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
          VIP: ${cliente.calcularVisitas()}
          ------
          `);     
        });
      } 
    }
  }
}

const vete01 = new Veterinaria("vete 1", "av123", 1223444);
const cliente01 = new Cliente("Ana Rodriguez", 123456);
vete01.agregarCliente(cliente01);
const perro01 = new Perros("golden", "macho", "3 meses", cliente01);
//const exotico01 = new Exoticos("piton", "macho", "10 años", "vibora")
vete01.addPaciente(perro01);
//vete01.addPaciente(exotico01);

// vete01.showClientes();
// const prov01 = new Proveedor("proveedor kongo", 2345433);
// vete01.addProv(prov01);