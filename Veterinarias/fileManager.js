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
    fileManager.readClientes = function () {
        try {
            var data = fs.readFileSync("./clientes.txt", "utf8");
            console.log("Operacion exitosa.");
            rls.keyInPause("\n");
            var lineas = data.split("\n"); //dividir la cadena de texto en un array de strings del archivo txt clientes por linea
            //el método map transforma cada elemento del array lineas en un nuevo objeto Cliente
            var clientes = lineas.map(function (linea) {
                var _a = linea.split(","), nombreCliente = _a[0], telCliente = _a[1]; //el método split divide cada linea en un array de dos elementos.
                return new cliente_1.Cliente(nombreCliente, parseInt(telCliente)); //método parseInt para transformar el tipo string del array a tipo number del parámetro del constructor Cliente.
            });
            return clientes;
        }
        catch (err) {
            console.error(err);
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
    fileManager.readProveedores = function () {
        try {
            var data = fs.readFileSync("./proveedores.txt", "utf8");
            console.log("Operacion exitosa.");
            rls.keyInPause("\n");
            var lineas = data.split("\n"); //dividir la cadena de texto en un array de strings del archivo txt clientes por linea
            //el método map transforma cada elemento del array lineas en un nuevo objeto Cliente
            var proveedores = lineas.map(function (linea) {
                var _a = linea.split(","), nombreProv = _a[0], telProv = _a[1]; //el método split divide cada linea en un array de dos elementos.
                return new proveedor_1.Proveedor(nombreProv, parseInt(telProv)); //método parseInt para transformar el tipo string del array a tipo number del parámetro del constructor Cliente.
            });
            return proveedores;
        }
        catch (err) {
            console.error(err);
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
                    var cliente_2 = new cliente_1.Cliente(nombreCliente, parseInt(telCliente));
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
