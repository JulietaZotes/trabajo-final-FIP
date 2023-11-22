export class Cliente {
  private  IdCliente: string;
  private  NombreCliente: string;
  private  TelCliente: number;
  private  EsVIP: boolean;
  private  Visitas: number;
  clientes = [];

public constructor(idCLiente: string, NombreCliente : string , TelCliente : number ){
  this.IdCliente = idCLiente;
  this.NombreCliente = NombreCliente ;
  this.TelCliente = TelCliente ;
  this.EsVIP = false;
  this.Visitas = 0;
}
public Getid(){
  return this.IdCliente;

}

public SetNombreCliente (NombreCliente : string):void {
  this.NombreCliente = NombreCliente ;
}

public GetNombreCliente (){
  return this.NombreCliente;
}

public SetTelefonoCliente (TelCliente : number){
  this.TelCliente = TelCliente ;
}

public GetTelefonoCliente () {
  return this.TelCliente;
}

public isVIP(){
  if (this.EsVIP) {
    return ("Si");
  } else {
    return ("No");
  }
}

} 