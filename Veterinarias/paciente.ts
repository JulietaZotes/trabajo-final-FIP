import { randomUUID as uid } from "node:crypto";

export class Paciente {
  private pacientes: {
    id: string; 
    nombre: string;
    especie: string;
    idPropietario: number;
  }[] = [];

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
