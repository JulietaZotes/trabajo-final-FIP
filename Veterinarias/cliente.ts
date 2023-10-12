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


//funcionaaaaasdasd