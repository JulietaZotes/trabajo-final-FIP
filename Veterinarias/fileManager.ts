import * as fs from "node:fs";
import { Cliente } from "./cliente";
import { Proveedor } from "./proveedor";
import { Especies } from "./especies";
import * as rls from "readline-sync";
import { Veterinaria } from "./veterinaria";

export interface ClienteData {
    idCliente: string;
    NombreCliente: string;
    TelCliente: number;
  }
  export interface proveedorData  {
    idProveedor: string;
    NombreProveedor: string;
    TelProveedor: number;
  }


interface PacienteData {
    raza: string;
    sexo: string;
    edad: string;
    duenio: {
        IdCliente: string;
        NombreCliente: string;
        TelCliente: number;
        EsVIP: boolean;
        Visitas: number;
    };
}
interface VeterinariaData {
        nombre: string;
        direccion: string;
        telefono: number;
        id: string;
    }
export class fileManager {

    static readClientes(filePath) {
        try {
            const data = fs.readFileSync("./clientes.txt", "utf8");
            console.log("Operacion exitosa.");
            rls.keyInPause("\n");
            const lineas = data.split("\n"); //dividir la cadena de texto en un array de strings del archivo txt clientes por linea
            //el método map transforma cada elemento del array lineas en un nuevo objeto Cliente
            const clientes = lineas.map((linea) => {
                const [idCLiente, nombreCliente, telCliente] = linea.split(","); //el método split divide cada linea en un array de dos elementos.
                return new Cliente(idCLiente, nombreCliente, parseInt(telCliente)); //método parseInt para transformar el tipo string del array a tipo number del parámetro del constructor Cliente.
            });
    
            return clientes;
        } catch (err) {
            console.error('Error al leer el archivo de clientes:', err);
            return [];
        }
    }
    
    static appendClientes(data: Cliente[]) {
        try {
            fs.writeFileSync("./clientes.txt", JSON.stringify(data, null, 2), { encoding: "utf8" });
            console.log("Operacion exitosa.");
            rls.keyInPause("\n");
        } catch (err) {
            console.log("Error inesperado:", err);
        }
    }
    
    static readProveedores(filePath) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');

            // Verificar si el archivo está vacío
            if (!data.trim()) {
                console.log("El archivo de proveedores está vacío.");
                return [];
            }

            const proveedoresData = JSON.parse(data);

            if (!Array.isArray(proveedoresData)) {
                console.error('El archivo no contiene un array de proveedores.');
                return [];
            }

            const proveedores = proveedoresData.map((proveedorData) => {
                const idProv = proveedorData.IdProv || '';
                const nombreProv = proveedorData.NombreProv || '';
                const telProv = parseInt(proveedorData.TelefonoProv);

                return new Proveedor(nombreProv, telProv, idProv);
            });

            return proveedores;
        } catch (err) {
            console.error('Error al leer el archivo de proveedores:', err);
            return [];
        }
    }
        
    
    

    static appendProveedores(data: Proveedor[]) {
        try {
            fs.writeFileSync("./proveedores.txt", JSON.stringify(data, null, 2), { encoding: "utf8" });
            console.log("Operacion exitosa.");
            rls.keyInPause("\n");
        } catch (err) {
            console.log("Error inesperado:", err);
        }
    }
    
    static appendPacientes(data: Especies[]) {
        try {
            const jsonData = JSON.stringify(data, null, 2);
            fs.writeFileSync("./pacientes.txt", jsonData, { encoding: "utf8" });
            //console.log("Operacion exitosa.");
            //rls.keyInPause("\n");
        } catch (err) {
            console.log("Error inesperado:", err);
        }
    }

    static readPacientes() {
        try {
            const data = fs.readFileSync("./pacientes.txt", "utf8");
            //console.log("Operación exitosa.");
            const pacientesData: PacienteData[] = JSON.parse(data);
    
            // Crear instancias de Especies y Cliente a partir de los datos cargados
            const clientesMap = new Map<string, Cliente>();
            const pacientes = pacientesData.map((pacienteData) => {
                const idDuenio = pacienteData.duenio.IdCliente;
    
                // Verificar si el cliente ya existe en el mapa
                let cliente = clientesMap.get(idDuenio);
    
                if (!cliente) {
                    const nombreDuenio = pacienteData.duenio.NombreCliente;
                    const telDuenio = pacienteData.duenio.TelCliente;
    
                    // Si no existe, crear una nueva instancia de Cliente
                    cliente = new Cliente( idDuenio ,nombreDuenio, telDuenio);
                    // Agregar el cliente al mapa
                    clientesMap.set(idDuenio, cliente);
                }
    
                const raza = pacienteData.raza;
                const sexo = pacienteData.sexo;
                const edad = pacienteData.edad;
    
                return new Especies(raza, sexo, edad, cliente);
            });
    
            return pacientes as Especies[];
        } catch (err) {
            console.error(err);
            return [];
        }
    }
    static appendVeterinarias(data: Veterinaria[]) {
        try {
            fs.writeFileSync("./veterinarias.txt", JSON.stringify(data, null, 2), { encoding: "utf8" });
            //console.log("Operacion exitosa.");
            //rls.keyInPause("\n");
        } catch (err) {
            console.log("Error inesperado:", err);
        }
    }

    
    
    static readVeterinarias() {
        try {
            const data = fs.readFileSync("./veterinarias.txt", "utf8");
            const datosVeterinarias: VeterinariaData[] = JSON.parse(data);
    
            const mapaVeterinarias = new Map<string, Veterinaria>(); //clave: string, valor: instancia de Veterinaria
            const veterinarias = datosVeterinarias.map((datosVeterinaria) => {
                const idVeterinaria = datosVeterinaria.id;
    
                // Verificar si la veterinaria ya existe en el mapa
                let veterinaria = mapaVeterinarias.get(idVeterinaria);
    
                if (!veterinaria) {
                    const nombreVeterinaria = datosVeterinaria.nombre;
                    const direccionVeterinaria = datosVeterinaria.direccion;
                    const telVeterinaria = datosVeterinaria.telefono;
    
                    // Si no existe, crear una nueva instancia de Veterinaria
                    veterinaria = new Veterinaria(nombreVeterinaria, direccionVeterinaria, telVeterinaria);
                    // Agregar la veterinaria al mapa
                    mapaVeterinarias.set(idVeterinaria, veterinaria); //asocia la clave idVeterinaria con la instancia veterinaria dentro del Map.
                }
    
                return veterinaria;
            });
    
            // Devolver el array de veterinarias
            return veterinarias as Veterinaria[];
        } catch (err) {
            console.error(err);
            return [];
        }
    }
    
}


    