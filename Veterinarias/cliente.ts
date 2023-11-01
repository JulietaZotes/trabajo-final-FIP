<<<<<<< HEAD
=======
import { log } from "node:console";
>>>>>>> 2e5ded4689c97b8411b03dc9b568cae0d8f4fe69
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
>>>>>>> 2e5ded4689c97b8411b03dc9b568cae0d8f4fe69

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
<<<<<<< HEAD
=======
}

public isVIP(){
  if (this.EsVIP) {
    return ("Si");
  } else {
    return ("No");
  }
>>>>>>> 2e5ded4689c97b8411b03dc9b568cae0d8f4fe69
}

}  

<<<<<<< HEAD

}  

=======
>>>>>>> 2e5ded4689c97b8411b03dc9b568cae0d8f4fe69
///comentario


//funcionaaaaasdasd
