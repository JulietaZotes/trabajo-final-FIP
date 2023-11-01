import { Cliente } from "./cliente";
import { Especies } from "./especies";
export class Perros extends Especies{
    constructor(raza: string, sexo: string, edad: string, duenio: Cliente){
        super(raza, sexo, edad, duenio)
    };
}