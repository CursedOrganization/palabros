import * as fsPromise from 'fs/promises';
import * as fs from 'fs';

export interface IInusltos {
    dameInsultos(): Insulto[];
}

export class Insulto {
    insulto: string;
    peso: number;
    constructor(insulto: string, peso: number) {
        this.insulto = insulto;
        this.peso = peso;
    }
}


export class InsultoService implements IInusltos {
    static #instance: InsultoService;

    private constructor() { }


    public static get instance(): InsultoService {
        if (!InsultoService.#instance) {
            InsultoService.#instance = new InsultoService();
        }

        return InsultoService.#instance;
    }

    // Array local para no tener que abrir el archivo cada vez
    insultos: Insulto[] = []

    dameInsultos(): Insulto[] {
        if (this.insultos.length > 0) {
            // Si no está vacío: devuelve el array ya creado

            return this.insultos;
        } else {
            // Si está vacío: almacena el contenido del documento y devuelve el array

            const file = fs.readFileSync('palabros.csv', 'utf-8');
            
            // Divide el contenido en líneas y las recorre
            for (const linea of file.split('\r\n')) {
                if (linea.trim().length > 0) {
                    // Si la línea no está vacía: añadir el contenido

                    const valores = linea.split(',');
                    this.insultos.push(new Insulto(valores[1].trim(), parseInt(valores[0])));

                }
            }
            return this.insultos;
        }
    }


}