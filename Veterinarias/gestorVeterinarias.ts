import { Especies } from "./especies";
import { Cliente } from "./cliente";
import { Proveedor } from "./proveedor";
import { Veterinaria } from "./veterinaria";
import { fileManager } from "./fileManager";
import * as rls from "readline-sync";
import { randomUUID as uid } from "node:crypto";
import { v4 as uuidv4 } from 'uuid';

class gestorVeterinarias {
  private especies: Especies[];
  private clientes: Cliente[];
  private proveedores: Proveedor[];
  private sucursales: Veterinaria[];
  
  public constructor() {
    this.especies = [];
    this.clientes = [];
    this.proveedores = [];
    this.sucursales = [];
  }
  
  OptionsMenuClientes = ["Lista de clientes", "Anadir nuevo", "Actualizar datos", "Eliminar"];
  OptionsMenuProveedores = ["Lista de proveedores", "Anadir nuevo", "Actualizar datos", "Eliminar"];
  OptionsMenuPacientes = ["Lista de pacientes", "Anadir nuevo", "Actualizar datos", "Eliminar"];
  OptionsMenuSucursales = ["Lista de sucursales", "Anadir nueva", "Actualizar datos", "Eliminar"];
  OptionsMenuGeneral = ["Sucursales", "Pacientes", "Clientes", "Proveedores"];
  //CRUD Pacientes
  public addPaciente() {
    const data = fileManager.readPacientes();
    console.log("\n------Nuevo paciente------\n");
    console.log("\n------Datos del propietario------\n");
    const nombreDuenio = rls.question("Ingrese el nombre: ");
    const telDuenio = rls.questionInt("Ingrese el telefono: ");
    const idDuenio = uid();
    const duenio = new Cliente(idDuenio, nombreDuenio, telDuenio);
    console.log("\n------Datos del paciente------\n");
    const raza = rls.question("Ingrese la raza: ");
    const sexo = rls.question("Ingrese el sexo: ");
    const edad = rls.question("Ingrese la edad: ");
    const newPaciente = new Especies(raza, sexo, edad, duenio);
    data.push(newPaciente);
    fileManager.appendPacientes(data);
    rls.keyInPause();
  }

  public updatePaciente() {
    const data = fileManager.readPacientes();
    if (data) {
      this.especies = data;
    }
    const idToUpdate = rls.question("Ingrese el ID del propietario: ");
    const paciente = this.especies.find((paciente) => paciente.getDuenio().GetId() === idToUpdate);
    if (paciente) {
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
      if (!readResult.length) {
        console.log("No se encontraron pacientes.\n");
      } else {
        readResult.forEach((paciente) => {
          console.log(`
          ID propietario: ${paciente.getDuenio().GetId()}
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

  public deletePaciente() {
    console.log("\n------Eliminar paciente------\n");
    const data = fileManager.readPacientes();
    if (data) {
      this.especies = data;
    }
    const idToDelete = rls.question("Ingrese el ID del propietario: ");
    const pacienteIndex = this.especies.findIndex(
      (paciente) => paciente.getDuenio().GetId() === idToDelete
    );
    if (pacienteIndex !== -1) {
      const pacienteToDelete = this.especies[pacienteIndex];
      const confirmation = rls.keyInYN(
        "¿Quiere eliminar al paciente?"
      );
      if (confirmation) {
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

  public menuPacientes() {
    console.log("\n------Pacientes------");
    while (true) {
      console.clear();
      const options = rls.keyInSelect(this.OptionsMenuPacientes);
      switch (options) {
        case 0:
          this.showPacientes();
          break;
        case 1:
          this.addPaciente();
          break;
        case 2:
          this.updatePaciente();
          break;
        case 3:
          this.deletePaciente();
          break;
        default:
          return;
      }
    }
  }

  //CRUD Clientes
  public addCliente(): void {
    const data = fileManager.readClientes("./clientes.txt") || [];
    console.log("\n------Datos del cliente------\n");
    const telefono = rls.questionInt("Ingrese el numero de telefono: ");
    const nombre = rls.question("Ingrese nombre del cliente: ");

    // Generar un nuevo ID automáticamente
    const idCliente = uuidv4();
    const newCliente = new Cliente(idCliente, nombre, telefono);

    // Añadir validación para evitar duplicados si es necesario
    const existingCliente = data.find((cliente) => cliente.GetId() === newCliente.GetId());

    if (!existingCliente) {
      data.push(newCliente);
      fileManager.appendClientes(data);

      console.log("Cliente añadido con exito.\n");
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
    const cliente = this.clientes.find((cliente) => cliente.GetId() === idToUpdate);

    if (cliente) {
      const newNombre = rls.question("Ingrese el nuevo nombre: ");
      cliente.SetNombreCliente(newNombre);

      const newTelefono = rls.question("Ingrese el nuevo telefono: ");
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
      (cliente) => cliente.GetId() === idToDelete
      );
    if (clienteIndex !== -1) {
      const clienteToDelete = this.clientes[clienteIndex];
      const confirmation = rls.keyInYNStrict("¿Quiere eliminar al cliente?");

      if (confirmation) {
        this.clientes.splice(clienteIndex, 1);
        fileManager.appendClientes(this.clientes);
        console.log("Cliente eliminado con éxito.");
      } else {
        console.log("Operacion cancelada. Cliente no eliminado.\n");
      }
    } else {
      console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
    }
    
    rls.keyInPause();
  }

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
        default:
          return; // Volver al menú principal
      }
    }
  }

  //CRUD Proveedores
  public addProveedor(): void {
    const data = fileManager.readProveedores("./proveedores.txt") || [];
    console.log("\n------Datos del proveedor------\n");
    const telefono = rls.questionInt("Ingrese el número de telefono: ");
    const nombre = rls.question("Ingrese el nombre del proveedor: ");
    
    // Generar un nuevo ID automáticamente
    const idProveedor = uuidv4();
    const newProveedor = new Proveedor(nombre, telefono, idProveedor);

    // Añadir validación para evitar duplicados si es necesario
    const existingProveedor = data.find((proveedor) => proveedor.getIdProv() === newProveedor.getIdProv());
    
    if (!existingProveedor) {
      data.push(newProveedor);
      fileManager.appendProveedores(data);
      
      console.log("Proveedor anadido con exito.\n");
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

      const newTelefono = rls.question("Ingrese el nuevo telefono: ");
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
        console.log("Operacion cancelada. Proveedor no eliminado.\n");
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
        default:
          return; // Volver al menú principal
      }
    }
    rls.keyInPause();
  }

  //CRUD Sucursales
  public addVeterinaria() {
    const data = fileManager.readVeterinarias();
    console.log("\n------Nueva sucursal------\n");

    const nombreVeterinaria = rls.question("Ingrese el nombre: ");
    const direccionVeterinaria = rls.question("Ingrese la direccion: ");
    const telVeterinaria = rls.questionInt("Ingrese el telefono: ");
    const idVeterinaria = uid();
    const newVeterinaria = new Veterinaria(nombreVeterinaria, direccionVeterinaria, telVeterinaria, idVeterinaria);
    data.push(newVeterinaria);
    this.sucursales.push(newVeterinaria);
    fileManager.appendVeterinarias(data);
    rls.keyInPause();
  }

  public updateVeterinaria() {
    const data = fileManager.readVeterinarias();
    console.log("\n------Actualizar datos sucursal------\n");
    if (data) {
      this.sucursales = data;
    }
    const idToUpdate = rls.question("Ingrese el ID de la sucursal: ");
    const veterinaria = this.sucursales.find((sucursal) => sucursal.getId() === idToUpdate);
    if (veterinaria) {
      const newNombre = rls.question("Ingrese el nombre: ");
      veterinaria.setNombre(newNombre);
      const newDireccion = rls.question("Ingrese la direccion: ");
      veterinaria.setDireccion(newDireccion);
      const newTelefono = rls.questionInt("Ingrese el telefono: ");
      veterinaria.setTelefono(newTelefono);
      console.log("Datos actualizados exitosamente.\n");
      fileManager.appendVeterinarias(this.sucursales);
    } else {
      console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
    }
    rls.keyInPause();
  }

  public showVeterinarias() {
    const readResult = fileManager.readVeterinarias(); //
    if (readResult) {
      console.log("\n------Sucursales------\n");
      if (!readResult.length) {
        console.log("No se encontraron pacientes.\n");
      } else {
        readResult.forEach((veterinaria) => {
          console.log(`
          ID: ${veterinaria.getId()}
          Nombre: ${veterinaria.getNombre()}
          Direccion: ${veterinaria.getDireccion()}
          Telefono: ${veterinaria.getTelefono()}
          ------
          `);
        });
      }
    }
    rls.keyInPause();
  }

  public deleteVeterinaria() {
    console.log("\n------Eliminar sucursal------\n");
    const data = fileManager.readVeterinarias();
    if (data) {
      this.sucursales = data;
    }
    const idToDelete = rls.question("Ingrese el ID de la sucursal: ");
    const sucursalIndex = this.sucursales.findIndex(
      (sucursal) => sucursal.getId() === idToDelete
    );
    if (sucursalIndex !== -1) {
      const sucursalToDelete = this.sucursales[sucursalIndex];
      const confirmation = rls.keyInYN(
        `¿Quiere eliminar la sucursal "${sucursalToDelete.getNombre()}"?`
      );
      if (confirmation) {
        this.sucursales.splice(sucursalIndex, 1);
        fileManager.appendVeterinarias(this.sucursales);
      } else {
        console.log("Operacion cancelada. Sucursal no eliminada.\n");

      }
    } else {
      console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
    }
    rls.keyInPause();
  }
  public menuSucursales() {
    console.log("\n------Sucursales------");
    while (true) {
      console.clear();
      const options = rls.keyInSelect(this.OptionsMenuSucursales);
      switch (options) {
        case 0:
          this.showVeterinarias();
          break;
        case 1:
          this.addVeterinaria();
          break;
        case 2:
          this.updateVeterinaria();
          break;
        case 3:
          this.deleteVeterinaria();
          break;
        default:
          return;
      }
    }
  }

  public menuGeneral() {
    console.log("\n------Menu Principal------");
    while (true) {
      console.clear();
      const options = rls.keyInSelect(this.OptionsMenuGeneral);
      switch (options) {
        case 0:
          this.menuSucursales();
          break;
        case 1:
          this.menuPacientes();
          break;
        case 2:
          this.menuClientes();
          break;
        case 3:
          this.menuProveedores();
          break;
        default:
          console.log("¡Gracias por usar nuestro sistema!");
          
          return;
      }
    }
  }

}



const gestor = new gestorVeterinarias();
//gestor.menuPacientes()
//gestor.addVeterinaria()
gestor.menuGeneral()
//gestor.menuClientes()
//gestor.menuSucursales()
//gestor.menuProveedores()
