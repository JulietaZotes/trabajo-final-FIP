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

  public mostrarClientes(): void {
    console.log("\n---Lista de Clientes---\n");
  
    const data = fileManager.readClientes();
  
    if (data) {
      this.clientes = data;
    }
  
    if (this.clientes.length === 0) {
      console.log("No hay clientes registrados.\n");
    } else {
      this.clientes.forEach((cliente) => {
        console.log(`
          ID: ${cliente.Getid()}
          Nombre: ${cliente.GetNombreCliente()}
          Teléfono: ${cliente.GetTelefonoCliente()}
          VIP: ${cliente.isVIP() ? 'Sí' : 'No'}  // Ternaria js
          ------
        `);
      });
    }
  
    rls.keyInPause();
  }
  public agregarCliente() {
    const data = fileManager.readClientes();
    console.log("\n------Nuevo cliente------\n");
    const nombreCliente = rls.question("Ingrese el nombre: ");
    const telCliente = rls.questionInt("Ingrese el telefono: ");
    const newCliente = new Cliente(nombreCliente, telCliente);
    data.push(newCliente);
    fileManager.appendClientes(data);
    console.log("Cliente añadido con éxito.\n");
    rls.keyInPause();
  }
  

  public eliminarCliente(): void {
    console.log("\n------Eliminar cliente------\n");
    const data = fileManager.readClientes();
  
    if (data) {
      this.clientes = data;
    }
  
    const idToDelete = rls.question("Ingrese el ID del cliente: ");
    const clienteIndex = this.clientes.findIndex((cliente) => cliente.Getid() === idToDelete);
  
    if (clienteIndex !== -1) {
      const clienteToDelete = this.clientes[clienteIndex];
      const confirmation = rls.keyInYNStrict("¿Quiere eliminar al cliente?");
  
      if (confirmation) {
        this.clientes.splice(clienteIndex, 1);
        fileManager.appendClientes(this.clientes);
        console.log("Cliente eliminado con éxito.");
      } else {
        console.log("Operación cancelada. Cliente no eliminado.\n");
      }
    } else {
      console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
    }
  
    rls.keyInPause();
  }
  public actualizarCliente(): void {
    const data = fileManager.readClientes();
  
    if (data) {
      this.clientes = data;
    }
  
    const idToUpdate = rls.question("Ingrese el ID del cliente: ");
    const cliente = this.clientes.find((cliente) => cliente.Getid() === idToUpdate);
  
    if (cliente) {
      const newNombre = rls.question("Ingrese el nuevo nombre: ");
      cliente.SetNombreCliente(newNombre);
  
      const newTelefono = rls.question("Ingrese el nuevo teléfono: ");
      cliente.SetTelefonoCliente(Number(newTelefono)); // Asumo que el teléfono es un número
  
      console.log("Datos actualizados exitosamente.\n");
      fileManager.appendClientes(this.clientes);
    } else {
      console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
    }
  
    rls.keyInPause();
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
          VIP: ${cliente.isVIP()}
          ------
          `);     
        });
      } 
    }
  }
  public menuClientes() {
    console.log("\n------Clientes------");
    while (true) {
      console.clear();
      const options = rls.keyInSelect(this.OptionsMenuClientes);
      switch (options) {
        case 0:
          this.mostrarClientes();
          break;
        case 1:
          this.agregarCliente();
          break;
        case 2:
          this.actualizarCliente();
          break;
        case 3:
          this.eliminarCliente();
          break;
      }
    }
  }
  
  OptionsMenuClientes = ["Lista de clientes", "Añadir nuevo", "Actualizar datos", "Eliminar"];
}

const vete01 = new Veterinaria("vete 1", "av123", 1223444);
const cliente01 = new Cliente("Ana Rodriguez", 123456);
vete01.agregarCliente();
const perro01 = new Perros("golden", "macho", "3 meses", cliente01);
//const exotico01 = new Exoticos("piton", "macho", "10 años", "vibora")
vete01.addPaciente(perro01);
//vete01.addPaciente(exotico01);

// vete01.showClientes();
// const prov01 = new Proveedor("proveedor kongo", 2345433);
// vete01.addProv(prov01);