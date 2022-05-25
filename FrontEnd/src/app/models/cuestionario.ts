import { Pregunta } from "./pregunta";

export class Cuestionario{
    id?: number;
    nombre: string;
    descripcion: string;
    fechaCreacion?: Date;
    listPregunta: Pregunta[];

    constructor(nombre: string, descripcion: string, fechaCreacion: Date, listPregunta: Pregunta[]){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaCreacion = fechaCreacion;
        this.listPregunta = listPregunta;
    }
}