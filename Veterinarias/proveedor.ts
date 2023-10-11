import { EntidadVeterinaria } from "./veterinaria";
class Proveedor extends EntidadVeterinaria {
    constructor(public telefono: string, nombre: string, direccion: string) {
      super(nombre, direccion);
    }
  }