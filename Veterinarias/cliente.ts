import { v4 as uuidv4 } from 'uuid';

export class Cliente {
  private idUnico: string;
  private  NombreCliente: string;
  private  TelCliente: number;
  private  EsVIP: boolean;
  private  Visitas: number;
  clientes = [];
  
public constructor(idCliente: string ,NombreCliente : string , TelCliente : number){
  this.idUnico = idCliente || uuidv4();
  this.NombreCliente = NombreCliente ;
  this.TelCliente = TelCliente ;
  this.EsVIP = false;
  this.Visitas = 0;

}
public GetIdUnico(): string {
  return this.idUnico;
}


public SetNombreCliente (NombreCliente : string):void {
  this.NombreCliente = NombreCliente ;
}

public GetNombreCliente (){
  return this.NombreCliente;
}

public SetTelefonoCliente(TelCliente: number): void {
  this.TelCliente = TelCliente;
}

public GetTelefonoCliente(): number {
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
  


