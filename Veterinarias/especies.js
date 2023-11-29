"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Especies = void 0;
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
    Especies.prototype.getDuenio = function () {
        return this.duenio;
    };
    return Especies;
}());
exports.Especies = Especies;
// const especie1 = new Especies("Raza1", "Sexo1", "Edad1");
// const especie2 = new Especies("Raza2", "Sexo2", "Edad2");
// crearEspecie(especie1);
// crearEspecie(especie2);
