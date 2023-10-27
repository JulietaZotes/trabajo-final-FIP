"use strict";
exports.__esModule = true;
exports.Especies = void 0;
var Especies = /** @class */ (function () {
    function Especies(raza, sexo, edad) {
        this.raza = raza;
        this.sexo = sexo;
        this.edad = edad;
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
    return Especies;
}());
exports.Especies = Especies;
