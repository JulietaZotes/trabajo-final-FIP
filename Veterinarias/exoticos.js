"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Exoticos = void 0;
var especies_1 = require("./especies");
var Exoticos = /** @class */ (function (_super) {
    __extends(Exoticos, _super);
    function Exoticos(raza, sexo, edad, tipo) {
        var _this = _super.call(this, raza, sexo, edad) || this;
        _this.tipo = tipo;
        return _this;
    }
    ;
    Exoticos.prototype.setTipo = function (tipo) {
        this.tipo = tipo;
    };
    Exoticos.prototype.getTipo = function () {
        return this.tipo;
    };
    return Exoticos;
}(especies_1.Especies));
exports.Exoticos = Exoticos;
