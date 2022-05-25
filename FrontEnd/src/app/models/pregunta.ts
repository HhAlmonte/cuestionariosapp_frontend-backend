import { Respuesta } from "./respuesta";

export class Pregunta {
    descripcion: string;
    listRespuesta: Respuesta[];
    hide?: boolean;
    
    constructor(descripcion: string, listRespuesta: Respuesta[]){
        this.descripcion = descripcion;
        this.listRespuesta = listRespuesta;
        this.hide = true;
    }
}