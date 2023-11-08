import * as fs from "node:fs";
import { Cliente } from "./cliente";
import { Proveedor } from "./proveedor";
import { Especies } from "./especies";
import * as rls from "readline-sync";

interface PacienteData {
    raza: string;
    sexo: string;
    edad: string;
    duenio: {
        IdCliente: string;
        NombreCliente: string;
        TelCliente: number;
        EsVIP: boolean;
        Visitas: number;
    };
}
export class fileManager {

    static readClientes() {
        try {
            const data = fs.readFileSync("./clientes.txt", "utf8");
            console.log("Operacion exitosa.");
            rls.keyInPause("\n");
            const lineas = data.split("\n"); //dividir la cadena de texto en un array de strings del archivo txt clientes por linea
            //el método map transforma cada elemento del array lineas en un nuevo objeto Cliente
            const clientes = lineas.map((linea) => {
                const [idCLiente, nombreCliente, telCliente] = linea.split(","); //el método split divide cada linea en un array de dos elementos.
                return new Cliente(idCLiente, nombreCliente, parseInt(telCliente)); //método parseInt para transformar el tipo string del array a tipo number del parámetro del constructor Cliente.
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
            const jsonData = JSON.stringify(data, null, 2);
            fs.writeFileSync("./pacientes.txt", jsonData, { encoding: "utf8" });
            //console.log("Operacion exitosa.");
            //rls.keyInPause("\n");
        } catch (err) {
            console.log("Error inesperado:", err);
        }
    }

    static readPacientes() {
        try {
            const data = fs.readFileSync("./pacientes.txt", "utf8");
            //console.log("Operación exitosa.");
            const pacientesData: PacienteData[] = JSON.parse(data);
    
            // Crear instancias de Especies y Cliente a partir de los datos cargados
            const clientesMap = new Map<string, Cliente>();
            const pacientes = pacientesData.map((pacienteData) => {
                const idDuenio = pacienteData.duenio.IdCliente;
    
                // Verificar si el cliente ya existe en el mapa
                let cliente = clientesMap.get(idDuenio);
    
                if (!cliente) {
                    const nombreDuenio = pacienteData.duenio.NombreCliente;
                    const telDuenio = pacienteData.duenio.TelCliente;
    
                    // Si no existe, crear una nueva instancia de Cliente
                    cliente = new Cliente( idDuenio ,nombreDuenio, telDuenio);
                    // Agregar el cliente al mapa
                    clientesMap.set(idDuenio, cliente);
                }
    
                const raza = pacienteData.raza;
                const sexo = pacienteData.sexo;
                const edad = pacienteData.edad;
    
                return new Especies(raza, sexo, edad, cliente);
            });
    
            return pacientes as Especies[];
        } catch (err) {
            console.error(err);
            return [];
        }
    }
}