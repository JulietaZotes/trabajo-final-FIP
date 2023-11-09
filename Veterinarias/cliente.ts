import { randomUUID as uid } from "node:crypto";


export class Cliente {
  private  IdCliente: string = uid();
  private  NombreCliente: string;
  private  TelCliente: number;
  private  EsVIP: boolean;
  private  Visitas: number;
  clientes = [];

public constructor(NombreCliente : string , TelCliente : number ){
  this.NombreCliente = NombreCliente ;
  this.TelCliente = TelCliente ;

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

public isVIP(): boolean {
  return this.EsVIP;
}
public generarVisita(): void {
  this.Visitas++;

  console.log(`Se generó una nueva visita para ${this.NombreCliente}.`);
  console.log(`El cliente ${this.NombreCliente} ha tenido ${this.Visitas} visita(s).`);

  if (this.Visitas >= 5 && !this.EsVIP) {
    this.EsVIP = true;
    console.log(`¡Felicidades! ${this.NombreCliente} ahora es un cliente VIP.`);
  }
}
}
  

///comentario


//funcionaaaaasdasd
