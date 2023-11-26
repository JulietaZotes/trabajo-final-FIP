import { v4 as uuidv4 } from 'uuid';

export class Proveedor  {
  private NombreProv : string ;
  private TelefonoProv : number ;
  private IdProv : string = uuidv4();
  proveedores = [];

  constructor(NombreProv: string, TelefonoProv: number, idProveedor:string) {
    this.NombreProv = NombreProv ;
    this.TelefonoProv = TelefonoProv;
    this.IdProv = idProveedor || uuidv4();
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