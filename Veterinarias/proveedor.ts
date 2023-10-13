<<<<<<< HEAD
import { EntidadVeterinaria } from "./veterinaria";
class Proveedor extends EntidadVeterinaria {
    constructor(public telefono: string, nombre: string, direccion: string) {
      super(nombre, direccion);
    }
=======
import { randomUUID as uid } from "node:crypto";

class Proveedor  {
  private NombreProv : string ;
  private TelefonoProv : number ;
  private IdProv : string = uid();

  constructor(NombreProv: string, TelefonoProv: number) {
    this.NombreProv = NombreProv ;
    this.TelefonoProv = TelefonoProv;
  }
  setNombreProv (NombreProv : string) :void{
    this.NombreProv = NombreProv ;
  }

  getNombreProv (){
    return this.NombreProv;
  }

  setTelefonoProv (TelefonoProv : number):void{
    this.TelefonoProv = TelefonoProv ;
  }

  getTelefonoProv () {
    return this.TelefonoProv ;
  }

  getIdProv () {
    return this.IdProv ;
  }

>>>>>>> 248b5b8a8dea4504b2481b6ad6b57bd9da9286ba
  }