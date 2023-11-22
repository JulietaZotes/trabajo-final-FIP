import { Especies } from "./especies";
import { Cliente } from "./cliente";
import { Proveedor } from "./proveedor";
import { Veterinaria } from "./veterinaria";
import { fileManager } from "./fileManager";
import * as rls from "readline-sync";
import { randomUUID as uid } from "node:crypto";

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
        const paciente = this.especies.find((paciente) => paciente.getDuenio().Getid() === idToUpdate);
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

    public deletePaciente() {
        console.log("\n------Eliminar paciente------\n");
        const data = fileManager.readPacientes();
        if (data) {
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

    OptionsMenuPacientes = ["Lista de pacientes", "Anadir nuevo", "Actualizar datos", "Eliminar"];
    OptionsMenuSucursales = ["Lista de sucursales", "Anadir nueva", "Actualizar datos", "Eliminar"];
    OptionsMenuGeneral = ["Sucursales", "Pacientes", "Clientes", "Proveedores"];

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
                default:
                    return;
            }
        }
    }

    }



    const gestor = new gestorVeterinarias();
//gestor.menuPacientes()
//gestor.addVeterinaria()
gestor.menuGeneral()
