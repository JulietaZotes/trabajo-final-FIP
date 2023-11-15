"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proveedor = void 0;
var node_crypto_1 = require("node:crypto");
var Proveedor = /** @class */ (function () {
    function Proveedor(NombreProv, TelefonoProv) {
        this.IdProv = (0, node_crypto_1.randomUUID)();
        this.proveedores = [];
        this.NombreProv = NombreProv;
        this.TelefonoProv = TelefonoProv;
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
