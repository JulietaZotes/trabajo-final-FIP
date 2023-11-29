"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var especies_1 = require("./especies");
var cliente_1 = require("./cliente");
var proveedor_1 = require("./proveedor");
var veterinaria_1 = require("./veterinaria");
var fileManager_1 = require("./fileManager");
var rls = require("readline-sync");
var node_crypto_1 = require("node:crypto");
var uuid_1 = require("uuid");
var gestorVeterinarias = /** @class */ (function () {
    function gestorVeterinarias() {
        this.OptionsMenuProveedores = ["Lista de proveedores", "Añadir nuevo", "Actualizar datos", "Eliminar", "Volver al menú principal"];
        this.OptionsMenuClientes = ["Lista de clientes", "Añadir nuevo", "Actualizar datos", "Eliminar", "Volver al menú principal"];
        this.OptionsMenuPacientes = ["Lista de pacientes", "Anadir nuevo", "Actualizar datos", "Eliminar"];
        this.OptionsMenuSucursales = ["Lista de sucursales", "Anadir nueva", "Actualizar datos", "Eliminar"];
        this.OptionsMenuGeneral = ["Sucursales", "Pacientes", "Clientes", "Proveedores"];
        this.especies = [];
        this.clientes = [];
        this.proveedores = [];
        this.sucursales = [];
    }
    //CRUD Pacientes
    gestorVeterinarias.prototype.addPaciente = function () {
        var data = fileManager_1.fileManager.readPacientes();
        console.log("\n------Nuevo paciente------\n");
        console.log("\n------Datos del propietario------\n");
        var nombreDuenio = rls.question("Ingrese el nombre: ");
        var telDuenio = rls.questionInt("Ingrese el telefono: ");
        var idDuenio = (0, node_crypto_1.randomUUID)();
        var duenio = new cliente_1.Cliente(idDuenio, nombreDuenio, telDuenio);
        console.log("\n------Datos del paciente------\n");
        var raza = rls.question("Ingrese la raza: ");
        var sexo = rls.question("Ingrese el sexo: ");
        var edad = rls.question("Ingrese la edad: ");
        var newPaciente = new especies_1.Especies(raza, sexo, edad, duenio);
        data.push(newPaciente);
        fileManager_1.fileManager.appendPacientes(data);
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.updatePaciente = function () {
        var data = fileManager_1.fileManager.readPacientes();
        if (data) {
            this.especies = data;
        }
        var idToUpdate = rls.question("Ingrese el ID del propietario: ");
        var paciente = this.especies.find(function (paciente) { return paciente.getDuenio().GetId() === idToUpdate; });
        if (paciente) {
            var newRaza = rls.question("Ingrese la raza: ");
            paciente.setRaza(newRaza);
            var newSexo = rls.question("Ingrese el sexo: ");
            paciente.setSexo(newSexo);
            var newEdad = rls.question("Ingrese la edad: ");
            paciente.setEdad(newEdad);
            console.log("Datos actualizados exitosamente.\n");
            fileManager_1.fileManager.appendPacientes(this.especies);
        }
        else {
            console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
        }
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.showPacientes = function () {
        var readResult = fileManager_1.fileManager.readPacientes(); //
        if (readResult) {
            console.log("\n------Pacientes------\n");
            if (!readResult.length) {
                console.log("No se encontraron pacientes.\n");
            }
            else {
                readResult.forEach(function (paciente) {
                    console.log("\n          ID propietario: ".concat(paciente.getDuenio().GetId(), "\n          Raza: ").concat(paciente.getRaza(), "\n          Sexo: ").concat(paciente.getSexo(), "\n          Edad: ").concat(paciente.getEdad(), "\n          ------\n          "));
                });
            }
        }
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.deletePaciente = function () {
        console.log("\n------Eliminar paciente------\n");
        var data = fileManager_1.fileManager.readPacientes();
        if (data) {
            this.especies = data;
        }
        var idToDelete = rls.question("Ingrese el ID del propietario: ");
        var pacienteIndex = this.especies.findIndex(function (paciente) { return paciente.getDuenio().GetId() === idToDelete; });
        if (pacienteIndex !== -1) {
            var pacienteToDelete = this.especies[pacienteIndex];
            var confirmation = rls.keyInYN("¿Quiere eliminar al paciente?");
            if (confirmation) {
                this.especies.splice(pacienteIndex, 1);
                fileManager_1.fileManager.appendPacientes(this.especies);
            }
            else {
                console.log("Operacion cancelada. Paciente no eliminado.\n");
            }
        }
        else {
            console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
        }
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.menuPacientes = function () {
        console.log("\n------Pacientes------");
        while (true) {
            console.clear();
            var options = rls.keyInSelect(this.OptionsMenuPacientes);
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
    };
    gestorVeterinarias.prototype.addCliente = function () {
        var data = fileManager_1.fileManager.readClientes("./clientes.txt") || [];
        console.log("\n------Datos del cliente------\n");
        var telefono = rls.questionInt("Ingrese el numero de telefono: ");
        var nombre = rls.question("Ingrese nombre del cliente: ");
        // Generar un nuevo ID automáticamente
        var idCliente = (0, uuid_1.v4)();
        var newCliente = new cliente_1.Cliente(idCliente, nombre, telefono);
        // Añadir validación para evitar duplicados si es necesario
        var existingCliente = data.find(function (cliente) { return cliente.GetId() === newCliente.GetId(); });
        if (!existingCliente) {
            data.push(newCliente);
            fileManager_1.fileManager.appendClientes(data);
            console.log("Cliente añadido con éxito.\n");
        }
        else {
            console.log("El cliente ya existe.\n");
        }
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.updateCliente = function () {
        var data = fileManager_1.fileManager.readClientes("./clientes.txt");
        if (data) {
            this.clientes = data;
        }
        var idToUpdate = rls.question("Ingrese el ID del cliente: ");
        var cliente = this.clientes.find(function (cliente) { return cliente.GetId() === idToUpdate; });
        if (cliente) {
            var newNombre = rls.question("Ingrese el nuevo nombre: ");
            cliente.SetNombreCliente(newNombre);
            var newTelefono = rls.question("Ingrese el nuevo teléfono: ");
            cliente.SetTelefonoCliente(Number(newTelefono));
            console.log("Datos actualizados exitosamente.\n");
            fileManager_1.fileManager.appendClientes(this.clientes);
        }
        else {
            console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
        }
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.showClientes = function () {
        var readResult = fileManager_1.fileManager.readClientes("./clientes.txt"); //
        if (readResult) {
            console.log("\n------clientes------\n");
            if (!readResult.length) {
                console.log("No se encontraron clientes.\n");
            }
            else {
                readResult.forEach(function (cliente) {
                    console.log("\n              nombre cliente: ".concat(cliente.GetNombreCliente(), "\n              telefono: ").concat(cliente.GetTelefonoCliente(), "\n              "));
                });
            }
        }
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.deleteCliente = function () {
        console.log("\n------Eliminar cliente------\n");
        var data = fileManager_1.fileManager.readClientes("./clientes.txt");
        if (data) {
            this.clientes = data;
        }
        var idToDelete = rls.question("Ingrese el ID del cliente: ");
        var clienteIndex = this.clientes.findIndex(function (cliente) { return cliente.GetId() === idToDelete; });
        if (clienteIndex !== -1) {
            var clienteToDelete = this.clientes[clienteIndex];
            var confirmation = rls.keyInYNStrict("¿Quiere eliminar al cliente?");
            if (confirmation) {
                this.clientes.splice(clienteIndex, 1);
                fileManager_1.fileManager.appendClientes(this.clientes);
                console.log("Cliente eliminado con éxito.");
            }
            else {
                console.log("Operación cancelada. Cliente no eliminado.\n");
            }
        }
        else {
            console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
        }
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.addProveedor = function () {
        var data = fileManager_1.fileManager.readProveedores("./proveedores.txt") || [];
        console.log("\n------Datos del proveedor------\n");
        var telefono = rls.questionInt("Ingrese el número de teléfono: ");
        var nombre = rls.question("Ingrese el nombre del proveedor: ");
        // Generar un nuevo ID automáticamente
        var idProveedor = (0, uuid_1.v4)();
        var newProveedor = new proveedor_1.Proveedor(nombre, telefono, idProveedor);
        // Añadir validación para evitar duplicados si es necesario
        var existingProveedor = data.find(function (proveedor) { return proveedor.getIdProv() === newProveedor.getIdProv(); });
        if (!existingProveedor) {
            data.push(newProveedor);
            fileManager_1.fileManager.appendProveedores(data);
            console.log("Proveedor añadido con éxito.\n");
        }
        else {
            console.log("El proveedor ya existe.\n");
        }
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.updateProveedor = function () {
        var data = fileManager_1.fileManager.readProveedores("./proveedores.txt");
        if (data) {
            this.proveedores = data;
        }
        var idToUpdate = rls.question("Ingrese el ID del proveedor: ");
        var proveedor = this.proveedores.find(function (proveedor) { return proveedor.getIdProv() === idToUpdate; });
        if (proveedor) {
            var newNombre = rls.question("Ingrese el nuevo nombre: ");
            proveedor.setNombreProv(newNombre);
            var newTelefono = rls.question("Ingrese el nuevo teléfono: ");
            proveedor.setTelefonoProv(Number(newTelefono));
            console.log("Datos actualizados exitosamente.\n");
            fileManager_1.fileManager.appendProveedores(this.proveedores);
        }
        else {
            console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
        }
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.showProveedores = function () {
        var readResult = fileManager_1.fileManager.readProveedores("./proveedores.txt");
        if (readResult) {
            console.log("\n------proveedores------\n");
            if (!readResult.length) {
                console.log("No se encontraron proveedores.\n");
            }
            else {
                readResult.forEach(function (proveedor) {
                    console.log("\n              nombre proveedor: ".concat(proveedor.getNombreProv(), "\n              telefono: ").concat(proveedor.getTelefonoProv(), "\n              "));
                });
            }
        }
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.deleteProveedor = function () {
        console.log("\n------Eliminar proveedor------\n");
        var data = fileManager_1.fileManager.readProveedores("./proveedores.txt");
        if (data) {
            this.proveedores = data;
        }
        var idToDelete = rls.question("Ingrese el ID del proveedor: ");
        var proveedorIndex = this.proveedores.findIndex(function (proveedor) { return proveedor.getIdProv() === idToDelete; });
        if (proveedorIndex !== -1) {
            var proveedorToDelete = this.proveedores[proveedorIndex];
            var confirmation = rls.keyInYNStrict("¿Quiere eliminar al proveedor?");
            if (confirmation) {
                this.proveedores.splice(proveedorIndex, 1);
                fileManager_1.fileManager.appendProveedores(this.proveedores);
                console.log("Proveedor eliminado con éxito.");
            }
            else {
                console.log("Operación cancelada. Proveedor no eliminado.\n");
            }
        }
        else {
            console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
        }
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.menuProveedores = function () {
        console.log("\n------Proveedores------");
        while (true) {
            console.clear();
            var options = rls.keyInSelect(this.OptionsMenuProveedores);
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
    };
    gestorVeterinarias.prototype.menuClientes = function () {
        console.log("\n------Clientes------");
        while (true) {
            console.clear();
            var options = rls.keyInSelect(this.OptionsMenuClientes);
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
    };
    //CRUD Sucursales
    gestorVeterinarias.prototype.addVeterinaria = function () {
        var data = fileManager_1.fileManager.readVeterinarias();
        console.log("\n------Nueva sucursal------\n");
        var nombreVeterinaria = rls.question("Ingrese el nombre: ");
        var direccionVeterinaria = rls.question("Ingrese la direccion: ");
        var telVeterinaria = rls.questionInt("Ingrese el telefono: ");
        var idVeterinaria = (0, node_crypto_1.randomUUID)();
        var newVeterinaria = new veterinaria_1.Veterinaria(nombreVeterinaria, direccionVeterinaria, telVeterinaria, idVeterinaria);
        data.push(newVeterinaria);
        this.sucursales.push(newVeterinaria);
        fileManager_1.fileManager.appendVeterinarias(data);
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.updateVeterinaria = function () {
        var data = fileManager_1.fileManager.readVeterinarias();
        console.log("\n------Actualizar datos sucursal------\n");
        if (data) {
            this.sucursales = data;
        }
        var idToUpdate = rls.question("Ingrese el ID de la sucursal: ");
        var veterinaria = this.sucursales.find(function (sucursal) { return sucursal.getId() === idToUpdate; });
        if (veterinaria) {
            var newNombre = rls.question("Ingrese el nombre: ");
            veterinaria.setNombre(newNombre);
            var newDireccion = rls.question("Ingrese la direccion: ");
            veterinaria.setDireccion(newDireccion);
            var newTelefono = rls.questionInt("Ingrese el telefono: ");
            veterinaria.setTelefono(newTelefono);
            console.log("Datos actualizados exitosamente.\n");
            fileManager_1.fileManager.appendVeterinarias(this.sucursales);
        }
        else {
            console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
        }
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.showVeterinarias = function () {
        var readResult = fileManager_1.fileManager.readVeterinarias(); //
        if (readResult) {
            console.log("\n------Sucursales------\n");
            if (!readResult.length) {
                console.log("No se encontraron pacientes.\n");
            }
            else {
                readResult.forEach(function (veterinaria) {
                    console.log("\n          ID: ".concat(veterinaria.getId(), "\n          Nombre: ").concat(veterinaria.getNombre(), "\n          Direccion: ").concat(veterinaria.getDireccion(), "\n          Telefono: ").concat(veterinaria.getTelefono(), "\n          ------\n          "));
                });
            }
        }
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.deleteVeterinaria = function () {
        console.log("\n------Eliminar sucursal------\n");
        var data = fileManager_1.fileManager.readVeterinarias();
        if (data) {
            this.sucursales = data;
        }
        var idToDelete = rls.question("Ingrese el ID de la sucursal: ");
        var sucursalIndex = this.sucursales.findIndex(function (sucursal) { return sucursal.getId() === idToDelete; });
        if (sucursalIndex !== -1) {
            var sucursalToDelete = this.sucursales[sucursalIndex];
            var confirmation = rls.keyInYN("\u00BFQuiere eliminar la sucursal \"".concat(sucursalToDelete.getNombre(), "\"?"));
            if (confirmation) {
                this.sucursales.splice(sucursalIndex, 1);
                fileManager_1.fileManager.appendVeterinarias(this.sucursales);
            }
            else {
                console.log("Operacion cancelada. Sucursal no eliminada.\n");
            }
        }
        else {
            console.log("No hay coincidencias para el ID ingresado. Intente nuevamente.\n");
        }
        rls.keyInPause();
    };
    gestorVeterinarias.prototype.menuSucursales = function () {
        console.log("\n------Sucursales------");
        while (true) {
            console.clear();
            var options = rls.keyInSelect(this.OptionsMenuSucursales);
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
    };
    gestorVeterinarias.prototype.menuGeneral = function () {
        console.log("\n------Menu Principal------");
        while (true) {
            console.clear();
            var options = rls.keyInSelect(this.OptionsMenuGeneral);
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
    };
    return gestorVeterinarias;
}());
var gestor = new gestorVeterinarias();
//gestor.menuPacientes()
//gestor.addVeterinaria()
gestor.menuGeneral();
