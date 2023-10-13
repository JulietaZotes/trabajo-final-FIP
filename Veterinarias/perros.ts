import { Especies } from "./especies";
export class Perros extends Especies{
    constructor(raza: string, sexo: string, edad: string){
        super(raza, sexo, edad)
    };
}