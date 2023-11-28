"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Especies = void 0;
var fs = require("node:fs");
var Especies = /** @class */ (function () {
    function Especies(raza, sexo, edad, duenio) {
        this.pacientes = [];
        this.raza = raza;
        this.sexo = sexo;
        this.edad = edad;
        this.duenio = duenio;
    }
    Especies.prototype.setRaza = function (raza) {
        this.raza = raza;
    };
    Especies.prototype.setSexo = function (sexo) {
        this.sexo = sexo;
    };
    Especies.prototype.setEdad = function (edad) {
        this.edad = edad;
    };
    Especies.prototype.getRaza = function () {
        return this.raza;
    };
    Especies.prototype.getSexo = function () {
        return this.sexo;
    };
    Especies.prototype.getEdad = function () {
        return this.edad;
    };
    Especies.prototype.writeToEspeciesFile = function (id) {
        fs.appendFile('pacientes.txt', id + '\n', function (err) {
            if (err) {
                console.error('Error al escribir en el archivo especies.txt');
            }
            else {
                console.log('ID del cliente escrito en especies.txt');
            }
        });
    };
    return Especies;
}());
exports.Especies = Especies;
// Función para leer datos desde el archivo
function leerDatosDesdeArchivo(archivo) {
    try {
        var data = fs.readFileSync(archivo, 'utf-8');
        var lines = data.split('\n');
        var especies = [];
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            var _a = line.split(', '), raza = _a[0], sexo = _a[1], edad = _a[2];
            especies.push(new Especies(raza, sexo, edad));
        }
        return especies;
    }
    catch (error) {
        return [];
    }
}
// Función para guardar datos en el archivo
function guardarDatosEnArchivo(archivo, datos) {
    var lines = datos.map(function (especie) { return "".concat(especie.getRaza(), ", ").concat(especie.getSexo(), ", ").concat(especie.getEdad()); });
    var data = lines.join('\n');
    fs.writeFileSync(archivo, data, 'utf-8');
}
var archivoDatos = 'especies.txt';
// Operación de crear especie
function crearEspecie(especie) {
    var database = leerDatosDesdeArchivo(archivoDatos);
    database.push(especie);
    guardarDatosEnArchivo(archivoDatos, database);
}
// Operación R - Leer (lee el arreglo de todas las especies)
function obtenerTodasLasEspecies() {
    return leerDatosDesdeArchivo(archivoDatos);
}
// Operación U - Actualizar (Actualizar una especie por índice)
function actualizarEspecie(index, nuevaEspecie) {
    var database = leerDatosDesdeArchivo(archivoDatos);
    if (index >= 0 && index < database.length) {
        database[index] = nuevaEspecie;
        guardarDatosEnArchivo(archivoDatos, database);
        return true;
    }
    return false;
}
// Operación D - Eliminar (Eliminar una especie por índice)
function eliminarEspecie(index) {
    var database = leerDatosDesdeArchivo(archivoDatos);
    if (index >= 0 && index < database.length) {
        database.splice(index, 1);
        guardarDatosEnArchivo(archivoDatos, database);
        return true;
    }
    return false;
}
