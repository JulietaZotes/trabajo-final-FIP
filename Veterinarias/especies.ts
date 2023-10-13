import { Perros } from "./perros";
import { Gatos } from "./gatos";
import { Exoticos } from "./exoticos";

export class Especies {
    private raza: string;
    private sexo: string;
    private edad: number;

    constructor(raza: string, sexo: string, edad: number){
        this.raza = raza;
        this.sexo = sexo;
        this.edad = edad;
    }
        
    public setRaza(raza: string){
        this.raza = raza;
    }
    public setSexo(sexo: string){
        this.sexo = sexo;
    }
    public setEdad(edad: number){
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
    
}