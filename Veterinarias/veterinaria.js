"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veterinaria = void 0;
var cliente_1 = require("./cliente");
var fileManager_1 = require("./fileManager");
var proveedor_1 = require("./proveedor");
var rls = require("readline-sync");
var uuid_1 = require("uuid");
var Veterinaria = /** @class */ (function () {
    function Veterinaria(nombre, direccion, telefono) {
        this.OptionsMenuProveedores = ["Lista de proveedores", "Añadir nuevo", "Actualizar datos", "Eliminar", "Volver al menú principal"];
        this.OptionsMenuClientes = ["Lista de clientes", "Añadir nuevo", "Actualizar datos", "Eliminar", "Volver al menú principal"];
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.especies = [];
        this.clientes = [];
        this.proveedores = [];
    }
    Veterinaria.prototype.addPaciente = function (paciente) {
        this.especies.push(paciente);
        fileManager_1.fileManager.appendPacientes(this.especies);
    };
    Veterinaria.prototype.getNombre = function () {
        return this.nombre;
    };
    Veterinaria.prototype.getDireccion = function () {
        return this.direccion;
    };
    Veterinaria.prototype.getTelefono = function () {
        return this.telefono;
    };
    Veterinaria.prototype.setNombre = function (nuevoNombre) {
        this.nombre = nuevoNombre;
    };
    Veterinaria.prototype.setDireccion = function (nuevaDireccion) {
        this.direccion = nuevaDireccion;
    };
    Veterinaria.prototype.setTelefono = function (nuevoTelefono) {
        this.telefono = nuevoTelefono;
    };
    Veterinaria.prototype.addCliente = function () {
        var data = fileManager_1.fileManager.readClientes("./clientes.txt") || [];
        console.log("\n------Datos del cliente------\n");
        var telefono = rls.questionInt("Ingrese el numero de telefono: ");
        var nombre = rls.question("Ingrese nombre del cliente: ");
        // Generar un nuevo ID automáticamente
        var idCliente = (0, uuid_1.v4)();
        var newCliente = new cliente_1.Cliente(idCliente, nombre, telefono);
        // Añadir validación para evitar duplicados si es necesario
        var existingCliente = data.find(function (cliente) { return cliente.GetIdUnico() === newCliente.GetIdUnico(); });
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
    Veterinaria.prototype.updateCliente = function () {
        var data = fileManager_1.fileManager.readClientes("./clientes.txt");
        if (data) {
            this.clientes = data;
        }
        var idToUpdate = rls.question("Ingrese el ID del cliente: ");
        var cliente = this.clientes.find(function (cliente) { return cliente.GetIdUnico() === idToUpdate; });
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
    Veterinaria.prototype.showClientes = function () {
        var readResult = fileManager_1.fileManager.readClientes("./clientes.txt"); //
        if (readResult) {
            console.log("\n------clientes------\n");
            if (!readResult.length) {
                console.log("No se encontraron clientes.\n");
            }
            else {
                readResult.forEach(function (cliente) {
                    console.log("\n          nombre cliente: ".concat(cliente.GetNombreCliente(), "\n          telefono: ").concat(cliente.GetTelefonoCliente(), "\n          "));
                });
            }
        }
        rls.keyInPause();
    };
    Veterinaria.prototype.deleteCliente = function () {
        console.log("\n------Eliminar cliente------\n");
        var data = fileManager_1.fileManager.readClientes("./clientes.txt");
        if (data) {
            this.clientes = data;
        }
        var idToDelete = rls.question("Ingrese el ID del cliente: ");
        var clienteIndex = this.clientes.findIndex(function (cliente) { return cliente.GetIdUnico() === idToDelete; });
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
    Veterinaria.prototype.addProveedor = function () {
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
    Veterinaria.prototype.updateProveedor = function () {
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
    Veterinaria.prototype.showProveedores = function () {
        var readResult = fileManager_1.fileManager.readProveedores("./proveedores.txt");
        if (readResult) {
            console.log("\n------proveedores------\n");
            if (!readResult.length) {
                console.log("No se encontraron proveedores.\n");
            }
            else {
                readResult.forEach(function (proveedor) {
                    console.log("\n          nombre proveedor: ".concat(proveedor.getNombreProv(), "\n          telefono: ").concat(proveedor.getTelefonoProv(), "\n          "));
                });
            }
        }
        rls.keyInPause();
    };
    Veterinaria.prototype.deleteProveedor = function () {
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
    Veterinaria.prototype.menuProveedores = function () {
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
    Veterinaria.prototype.menuClientes = function () {
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
    return Veterinaria;
}());
exports.Veterinaria = Veterinaria;
var vete01 = new Veterinaria("vete 1", "av123", 1223444);
vete01.menuClientes();
