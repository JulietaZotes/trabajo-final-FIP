import * as fs from 'fs';

export class LeerRegistros<T> {
  private registros: T[] = [];

  constructor() {
    // Inicializa la propiedad registros como un array vacío.
  }

  leerRegistros(nombreDeArchivo: string): void {
    try {
      const data = fs.readFileSync(nombreDeArchivo, { encoding: 'utf-8' });
      this.registros = JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo JSON:', error);
    }
  }

  agregarRegistro(registro: T, nombreDeArchivo: string): void {
    this.leerRegistros(nombreDeArchivo);
    this.registros.push(registro);
    this.guardarRegistros(nombreDeArchivo);
  }

  modificarRegistro(indice: number, nuevoRegistro: T, nombreDeArchivo: string): void {
    this.leerRegistros(nombreDeArchivo);
    if (indice >= 0 && indice < this.registros.length) {
      this.registros[indice] = nuevoRegistro;
      this.guardarRegistros(nombreDeArchivo);
    } else {
      console.error('Índice fuera de rango');
    }
  }

  private guardarRegistros(nombreDeArchivo: string): void {
    try {
      const jsonRegistros = JSON.stringify(this.registros, null, 2);
      fs.writeFileSync(nombreDeArchivo, jsonRegistros, { encoding: 'utf-8' });
    } catch (error) {
      console.error('Error al guardar los registros:', error);
    }
  }
}

