<<<<<<< HEAD
import * as fs from "node:fs";
import { Cliente } from "./cliente";
import { Proveedor } from "./proveedor";
import { Especies } from "./especies";
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
            rls.keyInPause("\n");
        } catch (err) {
            console.log("Error inesperado:", err);
        }
    }

    static readPacientes() {
        try {
            const data = fs.readFileSync("./pacientes.txt", "utf8");
            console.log("Operacion exitosa.");
            rls.keyInPause("\n");
            const lineas = data.split("\n"); //dividir la cadena de texto en un array de strings del archivo txt clientes por linea
            const clientesMap = new Map();
            //el método map transforma cada elemento del array lineas en un nuevo objeto Cliente
            const pacientes = lineas.map((linea) => {
                const [raza, sexo, edad, idCliente ,nombreCliente, telCliente] = linea.split(","); //el método split divide cada linea en un array de dos elementos.
                let cliente = clientesMap.get(idCliente);
                if(!cliente){ 
                    const cliente = new Cliente(nombreCliente, parseInt(telCliente));
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
=======
import * as fs from 'fs';

export class LeerRegistros<T> {
  private registros: T[] = [];

  constructor() {
    // Inicializa la propiedad registros como un array vacío.
  }

  leerRegistros(nombreDeArchivo: string): void {
    try {
      const data = fs.readFileSync(nombreDeArchivo, { encoding: 'utf-8' });
      this.registros = JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo JSON:', error);
    }
  }

  agregarRegistro(registro: T, nombreDeArchivo: string): void {
    this.leerRegistros(nombreDeArchivo);
    this.registros.push(registro);
    this.guardarRegistros(nombreDeArchivo);
  }

  modificarRegistro(indice: number, nuevoRegistro: T, nombreDeArchivo: string): void {
    this.leerRegistros(nombreDeArchivo);
    if (indice >= 0 && indice < this.registros.length) {
      this.registros[indice] = nuevoRegistro;
      this.guardarRegistros(nombreDeArchivo);
    } else {
      console.error('Índice fuera de rango');
    }
  }

  private guardarRegistros(nombreDeArchivo: string): void {
    try {
      const jsonRegistros = JSON.stringify(this.registros, null, 2);
      fs.writeFileSync(nombreDeArchivo, jsonRegistros, { encoding: 'utf-8' });
    } catch (error) {
      console.error('Error al guardar los registros:', error);
    }
  }
}

>>>>>>> 9532f98fecc02cd3f9b398c5f21f27417bed655f
