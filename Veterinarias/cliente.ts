<<<<<<< HEAD
=======
import { log } from "node:console";
>>>>>>> da31cdb14bf86182b2a6bcc14f040c6d8700d057
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
<<<<<<< HEAD
=======
  this.EsVIP = false;
  this.Visitas = 0
>>>>>>> da31cdb14bf86182b2a6bcc14f040c6d8700d057

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

///comentario


//funcionaaaaasdasd
