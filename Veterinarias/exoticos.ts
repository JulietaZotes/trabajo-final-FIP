import { Especies } from "./especies";
export class Exoticos extends Especies {
    private tipo: string;
    constructor(raza: string, sexo: string, edad: string, tipo: string){
        super(raza, sexo, edad);
        this.tipo = tipo;
    };

    public setTipo(tipo: string){
        this.tipo = tipo;
    }
    public getTipo(){
        return this.tipo;
    }
}