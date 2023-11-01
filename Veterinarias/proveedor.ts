import { randomUUID as uid } from "node:crypto";

export class Proveedor  {
  private NombreProv : string ;
  private TelefonoProv : number ;
  private IdProv : string = uid();
  proveedores = [];

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

  }