import * as fs from "node:fs";
import { Cliente } from "./cliente";
import { Proveedor } from "./proveedor";
import { Especies } from "./especies";
import * as rls from "readline-sync";

export interface ClienteData {
    idCliente: string;
    NombreCliente: string;
    TelCliente: number;
  }

export class fileManager {

    static readClientes(filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
    
            // Verificar si el archivo está vacío
            if (!data.trim()) {
                console.log("El archivo de clientes está vacío.");
                return [];
            }
    
            const clientesData = JSON.parse(data);
    
            if (!Array.isArray(clientesData)) {
                console.error('El archivo no contiene un array de clientes.');
                return [];
            }
    
            const clientes = clientesData.map((clienteData) => {
                const idCliente = clienteData.idUnico || '';
                const nombreCliente = clienteData.NombreCliente || '';
                const telCliente = parseInt(clienteData.TelCliente);
    
                return new Cliente(idCliente, nombreCliente, telCliente);
            });
    
            return clientes;
        } catch (err) {
            console.error('Error al leer el archivo de clientes:', err);
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
    
    static readProveedores() {
        try {
            const data = fs.readFileSync("./proveedores.txt", "utf8");
            console.log("Operacion exitosa.");
            rls.keyInPause("\n");
            const lineas = data.split("\n"); //dividir la cadena de texto en un array de strings del archivo txt clientes por linea
            //el método map transforma cada elemento del array lineas en un nuevo objeto Cliente
            const proveedores = lineas.map((linea) => {
                const [nombreProv, telProv] = linea.split(","); //el método split divide cada linea en un array de dos elementos.
                return new Proveedor (nombreProv, parseInt(telProv)); //método parseInt para transformar el tipo string del array a tipo number del parámetro del constructor Cliente.
            });
            return proveedores as Proveedor[];
        } catch (err) {
            console.error(err);
            return [];
        }
    }

    static appendProveedores(data: Proveedor[]) {
        try {
            fs.writeFileSync("./proveedores.txt", JSON.stringify(data, null, 2), { encoding: "utf8" });
            console.log("Operacion exitosa.");
            rls.keyInPause("\n");
        } catch (err) {
            console.log("Error inesperado:", err);
        }
    }
    
    static appendPacientes(data: Especies[]) {
        try {
            fs.writeFileSync("./pacientes.txt", JSON.stringify(data, null, 2), { encoding: "utf8" });
            console.log("Operacion exitosa.");
            //rls.keyInPause("\n");
        } catch (err) {
            console.log("Error inesperado:", err);
        }
    }

    static readPacientes() {
        try {
            const data = fs.readFileSync("./pacientes.txt", "utf8");
            console.log("Operacion exitosa.");
            //rls.keyInPause("\n");
            const lineas = data.split("\n"); //dividir la cadena de texto en un array de strings del archivo txt clientes por linea
            const clientesMap = new Map();
            //el método map transforma cada elemento del array lineas en un nuevo objeto Cliente
            const pacientes = lineas.map((linea) => {
                const [raza, sexo, edad, idCliente ,nombreCliente, telCliente] = linea.split(","); //el método split divide cada linea en un array de dos elementos.
                let cliente = clientesMap.get(idCliente);
                if(!cliente){ 
                    const cliente = new Cliente(idCliente,nombreCliente, parseInt(telCliente), );
                    //clientesMap.setId(idCliente);
                    clientesMap.set(idCliente, cliente);
                }
                
                return new Especies (raza, sexo , edad, cliente); //método parseInt para transformar el tipo string del array a tipo number del parámetro del constructor Cliente.
            });
            return pacientes as Especies[];
        } catch (err) {
            console.error(err);
            return [];
        }
    }
}

function randomUUID(): string {
    throw new Error("Function not implemented.");
}
