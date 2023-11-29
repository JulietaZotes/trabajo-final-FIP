"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
var uuid_1 = require("uuid");
var Cliente = /** @class */ (function () {
    function Cliente(idCLiente, NombreCliente, TelCliente) {
        this.clientes = [];
        this.IdCliente = idCLiente || (0, uuid_1.v4)();
        this.NombreCliente = NombreCliente;
        this.TelCliente = TelCliente;
        this.EsVIP = false;
        this.Visitas = 0;
    }
    Cliente.prototype.GetId = function () {
        return this.IdCliente;
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
