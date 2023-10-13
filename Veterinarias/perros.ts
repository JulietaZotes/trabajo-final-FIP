import { Especies } from "./especies";
export class Perros extends Especies{
    constructor(raza: string, sexo: string, edad: number){
        super(raza, sexo, edad)
    };
}