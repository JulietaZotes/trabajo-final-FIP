import { Especies } from "./especies";
import { Perros } from "./perros";
import { Gatos } from "./gatos";
import { Exoticos } from "./exoticos";
import * as rls from "readline-sync";
import { Cliente } from "./cliente";
import { fileManager } from "./fileManager";
import { log } from "console";
import { Proveedor } from "./proveedor";


export class Veterinaria {
  private direccion: string;
  private nombre: string;
  private telefono: number;
  private especies: Especies[];
  private clientes: Cliente[];
  private proveedores: Proveedor[];
  public constructor(nombre: string, direccion: string, telefono: number) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.telefono = telefono;
    this.especies = [];
    this.clientes = [];
    this.proveedores = [];
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

  public addCliente(newCliente: Cliente) {

    this.clientes.push(newCliente);
    fileManager.readClientes();
    fileManager.appendClientes(this.clientes);
  }

  public addProv(newProv: Proveedor) {
    this.proveedores.push(newProv);
    fileManager.readClientes();
    fileManager.appendProveedores(this.proveedores);
  }



  public showClientes() {
    const readResult = fileManager.readClientes(); //
    if (readResult) {
      console.log("\n------Clientes------\n");
      if (!this.clientes.length) {
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

  //CRUD Pacientes
  public addPaciente() {
    const data = fileManager.readPacientes();
    console.log("\n------Nuevo paciente------\n");
    console.log("\n------Datos del propietario------\n");
    const nombreDuenio = rls.question("Ingrese el nombre: ");
    const telDuenio = rls.questionInt("Ingrese el telefono: ");
    const duenio = new Cliente(nombreDuenio, telDuenio);
    console.log("\n------Datos del paciente------\n");
    const raza = rls.question("Ingrese la raza: ");
    const sexo = rls.question("Ingrese el sexo: ");
    const edad = rls.question("Ingrese la edad: ");
    const newPaciente = new Especies(raza, sexo, edad, duenio);
    data.push(newPaciente);
    fileManager.appendPacientes(data);
    rls.keyInPause();
  }

  public updatePaciente(){
    const duenioId = rls.question("Ingrese el ID del propietario: ");
    const paciente = this.especies.find((paciente) => paciente.getDuenio().Getid() === duenioId);
    if (paciente){
    const newRaza = rls.question("Ingrese la raza: ");
    paciente.setRaza(newRaza);
    const newSexo = rls.question("Ingrese el sexo: ");
    paciente.setSexo(newSexo);
    const newEdad = rls.question("Ingrese la edad: ");
    paciente.setEdad(newEdad);
    console.log("Datos actualizados exitosamente.\n");
    fileManager.appendPacientes(this.especies);
    } else {
      console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
    }
    rls.keyInPause();
  }
  
  public showPacientes() {
    const readResult = fileManager.readPacientes(); //
    if (readResult) {
      console.log("\n------Pacientes------\n");
      if (!this.especies.length) {
        console.log("No se encontraron pacientes.\n");
      } else {
        this.especies.forEach((paciente) => {
          console.log(`
          ID propietario: ${paciente.getDuenio().Getid()}
          Raza: ${paciente.getRaza()}
          Sexo: ${paciente.getSexo()}
          Edad: ${paciente.getEdad()}
          ------
          `);
        });
      }
    }
    rls.keyInPause();
  }

  public deletePaciente(){
    console.log("\n------Eliminar paciente------\n");
    const data = fileManager.readPacientes();
    if(data){
      this.especies = data;
    }
    const idToDelete = rls.question("Ingrese el ID del propietario: ");
    const pacienteIndex = this.especies.findIndex(
      (paciente) => paciente.getDuenio().Getid() === idToDelete
      );
      if (pacienteIndex !== -1) {
        const pacienteToDelete = this.especies[pacienteIndex];
        const confirmation = rls.keyInYN(
          "¿Quiere eliminar al paciente?"
        );
        if (confirmation){
          this.especies.splice(pacienteIndex, 1);
          fileManager.appendPacientes(this.especies);
        } else {
          console.log("Operacion cancelada. Paciente no eliminado.\n");
          
        }
      } else {
        console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
      }
      rls.keyInPause();
  }

}

const vete01 = new Veterinaria("vete 1", "av123", 1223444);
vete01.showPacientes();
// vete01.addPaciente();
// vete01.updatePaciente();
// vete01.deletePaciente();