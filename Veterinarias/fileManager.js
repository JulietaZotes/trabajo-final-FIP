"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileManager = void 0;
var fs = require("node:fs");
var cliente_1 = require("./cliente");
var proveedor_1 = require("./proveedor");
var especies_1 = require("./especies");
var rls = require("readline-sync");
var veterinaria_1 = require("./veterinaria");
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
                var idCliente = clienteData.IdCliente || '';
                var nombreCliente = clienteData.NombreCliente || '';
                var telCliente = parseInt(clienteData.TelCliente);
                var esVIP = clienteData.EsVIP || false;
                var visitas = parseInt(clienteData.Visitas) || 0;
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
            var jsonData = JSON.stringify(data, null, 2);
            fs.writeFileSync("./pacientes.txt", jsonData, { encoding: "utf8" });
            //console.log("Operacion exitosa.");
            //rls.keyInPause("\n");
        }
        catch (err) {
            console.log("Error inesperado:", err);
        }
    };
    fileManager.readPacientes = function () {
        try {
            var data = fs.readFileSync("./pacientes.txt", "utf8");
            //console.log("Operación exitosa.");
            var pacientesData = JSON.parse(data);
            // Crear instancias de Especies y Cliente a partir de los datos cargados
            var clientesMap_1 = new Map();
            var pacientes = pacientesData.map(function (pacienteData) {
                var idDuenio = pacienteData.duenio.IdCliente;
                // Verificar si el cliente ya existe en el mapa
                var cliente = clientesMap_1.get(idDuenio);
                if (!cliente) {
                    var nombreDuenio = pacienteData.duenio.NombreCliente;
                    var telDuenio = pacienteData.duenio.TelCliente;
                    // Si no existe, crear una nueva instancia de Cliente
                    cliente = new cliente_1.Cliente(idDuenio, nombreDuenio, telDuenio);
                    // Agregar el cliente al mapa
                    clientesMap_1.set(idDuenio, cliente);
                }
                var raza = pacienteData.raza;
                var sexo = pacienteData.sexo;
                var edad = pacienteData.edad;
                return new especies_1.Especies(raza, sexo, edad, cliente);
            });
            return pacientes;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    };
    fileManager.appendVeterinarias = function (data) {
        try {
            fs.writeFileSync("./veterinarias.txt", JSON.stringify(data, null, 2), { encoding: "utf8" });
            //console.log("Operacion exitosa.");
            //rls.keyInPause("\n");
        }
        catch (err) {
            console.log("Error inesperado:", err);
        }
    };
    fileManager.readVeterinarias = function () {
        try {
            var data = fs.readFileSync("./veterinarias.txt", "utf8");
            var datosVeterinarias = JSON.parse(data);
            var mapaVeterinarias_1 = new Map(); //clave: string, valor: instancia de Veterinaria
            var veterinarias = datosVeterinarias.map(function (datosVeterinaria) {
                var idVeterinaria = datosVeterinaria.id;
                // Verificar si la veterinaria ya existe en el mapa
                var veterinaria = mapaVeterinarias_1.get(idVeterinaria);
                if (!veterinaria) {
                    var nombreVeterinaria = datosVeterinaria.nombre;
                    var direccionVeterinaria = datosVeterinaria.direccion;
                    var telVeterinaria = datosVeterinaria.telefono;
                    // Si no existe, crear una nueva instancia de Veterinaria
                    veterinaria = new veterinaria_1.Veterinaria(nombreVeterinaria, direccionVeterinaria, telVeterinaria, idVeterinaria);
                    // Agregar la veterinaria al mapa
                    mapaVeterinarias_1.set(idVeterinaria, veterinaria); //asocia la clave idVeterinaria con la instancia veterinaria dentro del Map.
                }
                return veterinaria;
            });
            // Devolver el array de veterinarias
            return veterinarias;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    };
    return fileManager;
}());
exports.fileManager = fileManager;
