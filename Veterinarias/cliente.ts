<<<<<<< HEAD
import { EntidadVeterinaria } from "./veterinaria";
import { randomUUID as uid } from "node:crypto";


export class Cliente extends EntidadVeterinaria {
  private clientes: {
    id: string;
    nombre: string;
    telefono: number;
    esVIP: boolean;
    visitas: number;
  }[] = [];

  public altaCliente(nombre: string, telefono: number): void {
    const nuevoCliente = {
      id: uid(),
      nombre,
      telefono,
      esVIP: false,
      visitas: 0,
    };
    this.clientes.push(nuevoCliente);
  }

  public bajaClientePorId(id: string): void {
    this.clientes = this.clientes.filter((cliente) => cliente.id !== id);
  }

  public modificarClientePorId(id: string, nuevoNombre: string, nuevoTelefono: number): void {
    this.clientes = this.clientes.map((cliente) => {
      if (cliente.id === id) {
        return {
          ...cliente,
          nombre: nuevoNombre,
          telefono: nuevoTelefono,
        };
      }
      return cliente;
    });
  }

  public marcarComoVIP(id: string): void {
    this.clientes = this.clientes.map((cliente) => {
      if (cliente.id === id) {
        if (cliente.visitas >= 5) {
          cliente.esVIP = true;
        }
        cliente.visitas++;
      }
      return cliente;
    });
  }
}
///comentario


=======
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



}  

///comentario


//funcionaaaaasdasd
>>>>>>> 248b5b8a8dea4504b2481b6ad6b57bd9da9286ba
