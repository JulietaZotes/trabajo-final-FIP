import { Cliente } from "./cliente";
import * as fs from "node:fs";

import * as fs from 'fs';
export class Especies {
<<<<<<< HEAD
  private raza: string;
  private sexo: string;
  private edad: string;

  constructor(raza: string, sexo: string, edad: string) {
    this.raza = raza;
    this.sexo = sexo;
    this.edad = edad;
  }

  public setRaza(raza: string) {
    this.raza = raza;
  }
  public setSexo(sexo: string) {
    this.sexo = sexo;
  }
  public setEdad(edad: string) {
    this.edad = edad;
  }
  public getRaza() {
    return this.raza;
  }
  public getSexo() {
    return this.sexo;
  }
  public getEdad() {
    return this.edad;
  }
=======
    private raza: string;
    private sexo: string;
    private edad: string;
    private duenio: Cliente;
    pacientes = [];

    constructor(raza: string, sexo: string, edad: string, duenio: Cliente){
        this.raza = raza;
        this.sexo = sexo;
        this.edad = edad;
        this.duenio = duenio;
    }
        
    public setRaza(raza: string){
        this.raza = raza;
    }
    public setSexo(sexo: string){
        this.sexo = sexo;
    }
    public setEdad(edad: string){
        this.edad = edad;
    }
    public getRaza(){
        return this.raza;
    }
    public getSexo(){
        return this.sexo;
    }
    public getEdad(){
        return this.edad;
    }
    
    private writeToEspeciesFile(id: string) {
        fs.appendFile('pacientes.txt', id + '\n', (err) => {
            if (err) {
                console.error('Error al escribir en el archivo especies.txt');
            } else {
                console.log('ID del cliente escrito en especies.txt');
            }
        });
    }

>>>>>>> 2e5ded4689c97b8411b03dc9b568cae0d8f4fe69
}

// Función para leer datos desde el archivo
function leerDatosDesdeArchivo(archivo: string): Especies[] {
  try {
    const data = fs.readFileSync(archivo, 'utf-8');
    const lines = data.split('\n');
    const especies: Especies[] = [];
    for (const line of lines) {
      const [raza, sexo, edad] = line.split(', ');
      especies.push(new Especies(raza, sexo, edad));
    }
    return especies;
  } catch (error) {
    return [];
  }
}

// Función para guardar datos en el archivo
function guardarDatosEnArchivo(archivo: string, datos: Especies[]) {
  const lines = datos.map((especie) => `${especie.getRaza()}, ${especie.getSexo()}, ${especie.getEdad()}`);
  const data = lines.join('\n');
  fs.writeFileSync(archivo, data, 'utf-8');
}

const archivoDatos = 'especies.txt';

// Operación de crear especie
function crearEspecie(especie: Especies) {
  const database = leerDatosDesdeArchivo(archivoDatos);
  database.push(especie);
  guardarDatosEnArchivo(archivoDatos, database);
}

// Operación R - Leer (lee el arreglo de todas las especies)
function obtenerTodasLasEspecies(): Especies[] {
  return leerDatosDesdeArchivo(archivoDatos);
}

// Operación U - Actualizar (Actualizar una especie por índice)
function actualizarEspecie(index: number, nuevaEspecie: Especies): boolean {
  const database = leerDatosDesdeArchivo(archivoDatos);
  if (index >= 0 && index < database.length) {
    database[index] = nuevaEspecie;
    guardarDatosEnArchivo(archivoDatos, database);
    return true;
  }
  return false;
}

// Operación D - Eliminar (Eliminar una especie por índice)
function eliminarEspecie(index: number): boolean {
  const database = leerDatosDesdeArchivo(archivoDatos);
  if (index >= 0 && index < database.length) {
    database.splice(index, 1);
    guardarDatosEnArchivo(archivoDatos, database);
    return true;
  }
  return false;
}


const especie1 = new Especies("Raza1", "Sexo1", "Edad1");
const especie2 = new Especies("Raza2", "Sexo2", "Edad2");

crearEspecie(especie1);
crearEspecie(especie2);

console.log(obtenerTodasLasEspecies());


