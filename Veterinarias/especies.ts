import { Cliente } from "./cliente";
import * as fs from "node:fs";

export class Especies {
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

}

