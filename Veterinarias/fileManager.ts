import * as fs from "node:fs";
import { Cliente } from "./cliente";
import * as rls from "readline-sync";

export class fileManager {

    static readClientes() {
        try {
            const data = fs.readFileSync("./clientes.txt", "utf8");
            console.log("Operacion exitosa.");
            rls.keyInPause("\n");
            const lineas = data.split("\n"); //dividir la cadena de texto en un array de strings del archivo txt clientes por linea
            //el método map transforma cada elemento del array lineas en un nuevo objeto Cliente
            const clientes = lineas.map((linea) => {
                const [nombreCliente, telCliente] = linea.split(","); //el método split divide cada linea en un array de dos elementos.
                return new Cliente(nombreCliente, parseInt(telCliente)); //método parseInt para transformar el tipo string del array a tipo number del parámetro del constructor Cliente.
            });
            return clientes as Cliente[];
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    static appendClientes(data: Cliente[]) {
        try {
            fs.writeFileSync("./clientes.txt", JSON.stringify(data, null, 2), { encoding: "utf8" });
            console.log("Operacion exitosa.");
            rls.keyInPause("\n");
        } catch (err) {
            console.log("Error inesperado:", err);
        }
    }
}