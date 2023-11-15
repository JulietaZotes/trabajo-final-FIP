"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
var node_crypto_1 = require("node:crypto");
var Cliente = /** @class */ (function () {
    function Cliente(NombreCliente, TelCliente) {
        this.idCliente = (0, node_crypto_1.randomUUID)();
        this.NombreCliente = NombreCliente;
        this.TelCliente = TelCliente;
        this.EsVIP = false;
        this.Visitas = 0;
    }
    Cliente.prototype.Getid = function () {
        return this.idCliente;
    };
    Cliente.prototype.SetNombreCliente = function (NombreCliente) {
        this.NombreCliente = NombreCliente;
    };
    Cliente.prototype.GetNombreCliente = function () {
        return this.NombreCliente;
    };
    Cliente.prototype.SetTelefonoCliente = function (TelCliente) {
        this.TelCliente = TelCliente;
    };
    Cliente.prototype.GetTelefonoCliente = function () {
        return this.TelCliente;
    };
    Cliente.prototype.isVIP = function () {
        return this.EsVIP;
    };
    Cliente.prototype.generarVisita = function () {
        this.Visitas++;
        console.log("Se gener\u00F3 una nueva visita para ".concat(this.NombreCliente, "."));
        console.log("El cliente ".concat(this.NombreCliente, " ha tenido ").concat(this.Visitas, " visita(s)."));
        if (this.Visitas >= 5 && !this.EsVIP) {
            this.EsVIP = true;
            console.log("\u00A1Felicidades! ".concat(this.NombreCliente, " ahora es un cliente VIP."));
        }
    };
    return Cliente;
}());
exports.Cliente = Cliente;
