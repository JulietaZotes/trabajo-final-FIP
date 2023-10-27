"use strict";
exports.__esModule = true;
exports.Veterinaria = void 0;
var perros_1 = require("./perros");
var exoticos_1 = require("./exoticos");
var Veterinaria = /** @class */ (function () {
    function Veterinaria(nombre, direccion, telefono) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.especies = [];
    }
    ;
    Veterinaria.prototype.addPaciente = function (paciente) {
        this.especies.push(paciente);
        console.log(this.especies);
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
    Veterinaria.prototype.mostrarInformacion = function () {
        console.log("\n    Nombre: ".concat(this.nombre, "\n    Direcci\u00F3n: ").concat(this.direccion, " \n    Telefono: ").concat(this.telefono, "\n    "));
    };
    return Veterinaria;
}());
exports.Veterinaria = Veterinaria;
var vete01 = new Veterinaria("vete 1", "av123", 1223444);
var perro01 = new perros_1.Perros("golden", "macho", "3 meses");
var exotico01 = new exoticos_1.Exoticos("piton", "macho", "10 años", "vibora");
vete01.addPaciente(perro01);
vete01.addPaciente(exotico01);
