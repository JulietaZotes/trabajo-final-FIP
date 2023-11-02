<<<<<<< HEAD
import { log } from "node:console";
=======

>>>>>>> 9532f98fecc02cd3f9b398c5f21f27417bed655f
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
  this.EsVIP = false;
  this.Visitas = 0
=======
>>>>>>> 9532f98fecc02cd3f9b398c5f21f27417bed655f

}
public Getid(){
  return this.IdCliente;

<<<<<<< HEAD
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

=======
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
}  

>>>>>>> 9532f98fecc02cd3f9b398c5f21f27417bed655f
///comentario


//funcionaaaaasdasd
