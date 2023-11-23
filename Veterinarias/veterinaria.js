"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veterinaria = void 0;
var cliente_1 = require("./cliente");
var fileManager_1 = require("./fileManager");
var rls = require("readline-sync");
var uuid_1 = require("uuid");
var Veterinaria = /** @class */ (function () {
    function Veterinaria(nombre, direccion, telefono) {
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
