"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileManager = void 0;
var fs = require("node:fs");
var cliente_1 = require("./cliente");
var proveedor_1 = require("./proveedor");
var especies_1 = require("./especies");
var rls = require("readline-sync");
var fileManager = /** @class */ (function () {
    function fileManager() {
    }
    fileManager.readClientes = function (filePath) {
        try {
            var data = fs.readFileSync(filePath, 'utf8');
            // Verificar si el archivo está vacío
            if (!data.trim()) {
                console.log("El archivo de clientes está vacío.");
                return [];
            }
            var clientesData = JSON.parse(data);
            if (!Array.isArray(clientesData)) {
                console.error('El archivo no contiene un array de clientes.');
                return [];
            }
            var clientes = clientesData.map(function (clienteData) {
                var idCliente = clienteData.idUnico || '';
                var nombreCliente = clienteData.NombreCliente || '';
                var telCliente = parseInt(clienteData.TelCliente);
                return new cliente_1.Cliente(idCliente, nombreCliente, telCliente);
            });
            return clientes;
        }
        catch (err) {
            console.error('Error al leer el archivo de clientes:', err);
            return [];
        }
    };
    fileManager.appendClientes = function (data) {
        try {
            fs.writeFileSync("./clientes.txt", JSON.stringify(data, null, 2), { encoding: "utf8" });
            console.log("Operacion exitosa.");
            rls.keyInPause("\n");
        }
        catch (err) {
            console.log("Error inesperado:", err);
        }
    };
    fileManager.readProveedores = function (filePath) {
        try {
            var data = fs.readFileSync(filePath, 'utf8');
            // Verificar si el archivo está vacío
            if (!data.trim()) {
                console.log("El archivo de proveedores está vacío.");
                return [];
            }
            var proveedoresData = JSON.parse(data);
            if (!Array.isArray(proveedoresData)) {
                console.error('El archivo no contiene un array de proveedores.');
                return [];
            }
            var proveedores = proveedoresData.map(function (proveedorData) {
                var idProv = proveedorData.IdProv || '';
                var nombreProv = proveedorData.NombreProv || '';
                var telProv = parseInt(proveedorData.TelefonoProv);
                return new proveedor_1.Proveedor(nombreProv, telProv, idProv);
            });
            return proveedores;
        }
        catch (err) {
            console.error('Error al leer el archivo de proveedores:', err);
            return [];
        }
    };
    fileManager.appendProveedores = function (data) {
        try {
            fs.writeFileSync("./proveedores.txt", JSON.stringify(data, null, 2), { encoding: "utf8" });
            console.log("Operacion exitosa.");
            rls.keyInPause("\n");
        }
        catch (err) {
            console.log("Error inesperado:", err);
        }
    };
    fileManager.appendPacientes = function (data) {
        try {
            fs.writeFileSync("./pacientes.txt", JSON.stringify(data, null, 2), { encoding: "utf8" });
            console.log("Operacion exitosa.");
            //rls.keyInPause("\n");
        }
        catch (err) {
            console.log("Error inesperado:", err);
        }
    };
    fileManager.readPacientes = function () {
        try {
            var data = fs.readFileSync("./pacientes.txt", "utf8");
            console.log("Operacion exitosa.");
            //rls.keyInPause("\n");
            var lineas = data.split("\n"); //dividir la cadena de texto en un array de strings del archivo txt clientes por linea
            var clientesMap_1 = new Map();
            //el método map transforma cada elemento del array lineas en un nuevo objeto Cliente
            var pacientes = lineas.map(function (linea) {
                var _a = linea.split(","), raza = _a[0], sexo = _a[1], edad = _a[2], idCliente = _a[3], nombreCliente = _a[4], telCliente = _a[5]; //el método split divide cada linea en un array de dos elementos.
                var cliente = clientesMap_1.get(idCliente);
                if (!cliente) {
                    var cliente_2 = new cliente_1.Cliente(idCliente, nombreCliente, parseInt(telCliente));
                    //clientesMap.setId(idCliente);
                    clientesMap_1.set(idCliente, cliente_2);
                }
                return new especies_1.Especies(raza, sexo, edad, cliente); //método parseInt para transformar el tipo string del array a tipo number del parámetro del constructor Cliente.
            });
            return pacientes;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    };
    return fileManager;
}());
exports.fileManager = fileManager;
function randomUUID() {
    throw new Error("Function not implemented.");
}
