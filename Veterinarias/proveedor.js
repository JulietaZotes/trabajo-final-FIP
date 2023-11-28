"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proveedor = void 0;
var uuid_1 = require("uuid");
var Proveedor = /** @class */ (function () {
    function Proveedor(NombreProv, TelefonoProv, idProveedor) {
        this.IdProv = (0, uuid_1.v4)();
        this.proveedores = [];
        this.NombreProv = NombreProv;
        this.TelefonoProv = TelefonoProv;
        this.IdProv = idProveedor || (0, uuid_1.v4)();
    }
    Proveedor.prototype.setNombreProv = function (NombreProv) {
        this.NombreProv = NombreProv;
    };
    Proveedor.prototype.getNombreProv = function () {
        return this.NombreProv;
    };
    Proveedor.prototype.setTelefonoProv = function (TelefonoProv) {
        this.TelefonoProv = TelefonoProv;
    };
    Proveedor.prototype.getTelefonoProv = function () {
        return this.TelefonoProv;
    };
    Proveedor.prototype.getIdProv = function () {
        return this.IdProv;
    };
    return Proveedor;
}());
exports.Proveedor = Proveedor;
