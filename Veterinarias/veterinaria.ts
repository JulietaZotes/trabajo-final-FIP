import { Especies } from "./especies";
import { Cliente } from "./cliente";
import { fileManager } from "./fileManager";
import { Proveedor } from "./proveedor";
import * as rls from "readline-sync";
import { v4 as uuidv4 } from 'uuid';

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
  }

  public addPaciente(paciente: Especies): void {
    this.especies.push(paciente);
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

  public addCliente(): void {
    const data = fileManager.readClientes("./clientes.txt") || [];
    console.log("\n------Datos del cliente------\n");
    const telefono = rls.questionInt("Ingrese el numero de telefono: ");
    const nombre = rls.question("Ingrese nombre del cliente: ");

    // Generar un nuevo ID automáticamente
    const idCliente = uuidv4();
    const newCliente = new Cliente(idCliente, nombre, telefono);

    // Añadir validación para evitar duplicados si es necesario
    const existingCliente = data.find((cliente) => cliente.GetIdUnico() === newCliente.GetIdUnico());

    if (!existingCliente) {
        data.push(newCliente);
        fileManager.appendClientes(data);

        console.log("Cliente añadido con éxito.\n");
    } else {
        console.log("El cliente ya existe.\n");
    }

    rls.keyInPause();
}


  
  public updateCliente() {
    const data = fileManager.readClientes("./clientes.txt");
    if (data) {
      this.clientes = data;
    }
  
    const idToUpdate = rls.question("Ingrese el ID del cliente: ");
    const cliente = this.clientes.find((cliente) => cliente.GetIdUnico() === idToUpdate);
  
    if (cliente) {
      const newNombre = rls.question("Ingrese el nuevo nombre: ");
      cliente.SetNombreCliente(newNombre);
  
      const newTelefono = rls.question("Ingrese el nuevo teléfono: ");
      cliente.SetTelefonoCliente(Number(newTelefono));
  
      console.log("Datos actualizados exitosamente.\n");
      fileManager.appendClientes(this.clientes);
    } else {
      console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
    }
  
    rls.keyInPause();
  }
  public showClientes() {
    const readResult = fileManager.readClientes("./clientes.txt"); //
    if (readResult) {
      console.log("\n------clientes------\n");
      if (!readResult.length) {
        console.log("No se encontraron clientes.\n");
      } else {
        readResult.forEach((cliente) => {
          console.log(`
          nombre cliente: ${cliente.GetNombreCliente()}
          telefono: ${cliente.GetTelefonoCliente()}
          `);
        });
      }
    }
    rls.keyInPause();
  }
  
  
  public deleteCliente() {
    console.log("\n------Eliminar cliente------\n");
    const data = fileManager.readClientes("./clientes.txt");
    if (data) {
      this.clientes = data;
    }
    const idToDelete = rls.question("Ingrese el ID del cliente: ");
    const clienteIndex = this.clientes.findIndex(
      (cliente) => cliente.GetIdUnico() === idToDelete
    );
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
  public addProveedor(): void {
    const data = fileManager.readProveedores("./proveedores.txt") || [];
    console.log("\n------Datos del proveedor------\n");
    const telefono = rls.questionInt("Ingrese el número de teléfono: ");
    const nombre = rls.question("Ingrese el nombre del proveedor: ");

    // Generar un nuevo ID automáticamente
    const idProveedor = uuidv4();
    const newProveedor = new Proveedor(nombre, telefono, idProveedor);

    // Añadir validación para evitar duplicados si es necesario
    const existingProveedor = data.find((proveedor) => proveedor.getIdProv() === newProveedor.getIdProv());

    if (!existingProveedor) {
        data.push(newProveedor);
        fileManager.appendProveedores(data);

        console.log("Proveedor añadido con éxito.\n");
    } else {
        console.log("El proveedor ya existe.\n");
    }

    rls.keyInPause();
}


  public updateProveedor() {
    const data = fileManager.readProveedores("./proveedores.txt");
    if (data) {
      this.proveedores = data;
    }
  
    const idToUpdate = rls.question("Ingrese el ID del proveedor: ");
    const proveedor = this.proveedores.find((proveedor) => proveedor.getIdProv() === idToUpdate);
  
    if (proveedor) {
      const newNombre = rls.question("Ingrese el nuevo nombre: ");
      proveedor.setNombreProv(newNombre);
  
      const newTelefono = rls.question("Ingrese el nuevo teléfono: ");
      proveedor.setTelefonoProv(Number(newTelefono));
  
      console.log("Datos actualizados exitosamente.\n");
      fileManager.appendProveedores(this.proveedores);
    } else {
      console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
    }
  
    rls.keyInPause();
  }

  public showProveedores() {
    const readResult = fileManager.readProveedores("./proveedores.txt");
    if (readResult) {
      console.log("\n------proveedores------\n");
      if (!readResult.length) {
        console.log("No se encontraron proveedores.\n");
      } else {
        readResult.forEach((proveedor) => {
          console.log(`
          nombre proveedor: ${proveedor.getNombreProv()}
          telefono: ${proveedor.getTelefonoProv()}
          `);
        });
      }
    }
    rls.keyInPause();
  }

  public deleteProveedor() {
    console.log("\n------Eliminar proveedor------\n");
    const data = fileManager.readProveedores("./proveedores.txt");
    if (data) {
      this.proveedores = data;
    }
    const idToDelete = rls.question("Ingrese el ID del proveedor: ");
    const proveedorIndex = this.proveedores.findIndex(
      (proveedor) => proveedor.getIdProv() === idToDelete
    );
    if (proveedorIndex !== -1) {
      const proveedorToDelete = this.proveedores[proveedorIndex];
      const confirmation = rls.keyInYNStrict("¿Quiere eliminar al proveedor?");
  
      if (confirmation) {
        this.proveedores.splice(proveedorIndex, 1);
        fileManager.appendProveedores(this.proveedores);
        console.log("Proveedor eliminado con éxito.");
      } else {
        console.log("Operación cancelada. Proveedor no eliminado.\n");
      }
    } else {
      console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
    }
  
    rls.keyInPause();
  }
  public menuProveedores() {
    console.log("\n------Proveedores------");
    while (true) {
      console.clear();
      const options = rls.keyInSelect(this.OptionsMenuProveedores);
      switch (options) {
        case 0:
          this.showProveedores();
          break;
        case 1:
          this.addProveedor();
          break;
        case 2:
          this.updateProveedor();
          break;
        case 3:
          this.deleteProveedor();
          break;
        case 4:
          return; // Volver al menú principal
      }
    }
  }
  
  OptionsMenuProveedores = ["Lista de proveedores", "Añadir nuevo", "Actualizar datos", "Eliminar", "Volver al menú principal"];


  public menuClientes() {
    console.log("\n------Clientes------");
    while (true) {
      console.clear();
      const options = rls.keyInSelect(this.OptionsMenuClientes);
      switch (options) {
        case 0:
          this.showClientes();
          break;
        case 1:
          this.addCliente();
          break;
        case 2:
          this.updateCliente();
          break;
        case 3:
          this.deleteCliente();
          break;
        case 4:
          return; // Volver al menú principal
      }
    }
  }
  
  OptionsMenuClientes = ["Lista de clientes", "Añadir nuevo", "Actualizar datos", "Eliminar", "Volver al menú principal"];
  
  
}
const vete01 = new Veterinaria("vete 1", "av123", 1223444);
vete01.menuClientes()
