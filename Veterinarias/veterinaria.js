"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veterinaria = void 0;
var fileManager_1 = require("./fileManager");
var Veterinaria = /** @class */ (function () {
    function Veterinaria(nombre, direccion, telefono, id) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.id = id;
        this.especies = [];
        this.clientes = [];
        this.proveedores = [];
    }
    ;
    Veterinaria.prototype.addPaciente = function (paciente) {
        this.especies.push(paciente);
        fileManager_1.fileManager.appendPacientes(this.especies);
    };
    Veterinaria.prototype.getId = function () {
        return this.id;
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
    return Veterinaria;
}());
exports.Veterinaria = Veterinaria;
