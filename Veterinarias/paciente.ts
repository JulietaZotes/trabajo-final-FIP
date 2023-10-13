import { randomUUID as uid } from "node:crypto";
import { Especies } from "./especies";


export class Paciente {
  private id: string;
  private nombre: string;
  private especie: Especies[];
  private idPropietario: string;
  private pacientes = [];

  public constructor (nombre: string, especie: Especies[]){
    this.nombre = nombre;
    this.especie = especie;
  }

  //DA DE ALTA UN PACIENTE CON EL ID DEL DUENO
  public altaPaciente(nombre: string, especie: string, idPropietario: number): void {
    //VALIDACIONES PARA VER SI NO ES PERRO  Y TAMPOCO ES GATO, ES EXOTICA
    if (especie !== 'perro' && especie !== 'gato') {
      especie = 'exótica';
    }

    const nuevoPaciente = {
      id: uid(),
      nombre,
      especie,
      idPropietario,
    };

    this.pacientes.push(nuevoPaciente);
  }

  // BAJA DE PACIENTE POR ID
  public bajaPacientePorId(id: string): void {
    this.pacientes = this.pacientes.filter((paciente) => paciente.id !== id);
  }

  //MODIFICO PACIENTE POR ID
  public modificarPacientePorId(id: string, nuevaEspecie: string, nuevoIdPropietario: number): void {
    this.pacientes = this.pacientes.map((paciente) => {
      if (paciente.id === id) {
        if (nuevaEspecie !== 'perro' && nuevaEspecie !== 'gato') {
          nuevaEspecie = 'exótica';
        }

        return {
          ...paciente,
          especie: nuevaEspecie,
          idPropietario: nuevoIdPropietario,
        };
      }
      return paciente;
    });
  }
}
