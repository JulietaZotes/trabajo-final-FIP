export class EntidadVeterinaria {
  private direccion:string;
  private nombre:string;
  private telefono:number;
  public constructor(nombre:string,direccion:string, telefono:number) {
      this.direccion;
      this.nombre
    }
    
  public getNombre(): string {
    return this.nombre;
  }


  public getDireccion(): string {
  return this.direccion;
  }

  public setNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre;
  }

  public setDireccion(nuevaDireccion: string): void {
    this.direccion = nuevaDireccion;
  }
  public mostrarInformacion(): void {
    console.log(`Nombre: ${this.nombre}, Dirección: ${this.direccion}`);
  }
  }
  
  