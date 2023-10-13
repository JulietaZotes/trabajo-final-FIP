import { Especies } from "./especies";
export class Gatos extends Especies{
    constructor(raza: string, sexo: string, edad: number){
        super(raza,sexo,edad)
    };
}