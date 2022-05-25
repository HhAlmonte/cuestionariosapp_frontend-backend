import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pregunta } from 'src/app/models/pregunta';
import { RespuestaCuestionario } from 'src/app/models/RespuestaCuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/RespuestaCuestionarioDetalle';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  idCuestionario!: number;
  listPregunta: Pregunta[] = [];
  loading = false;
  rtaConfirmada =false;
  opcionSeleccionada: any;
  index = 0;
  texto = 'Siguiente';
  idRespuestaSeleccionada!: number;
  rta: any;

  listRespuestaDetalle: RespuestaCuestionarioDetalle[]=[];

  constructor(private respuestaCuestionarioService: RespuestaCuestionarioService,
              private cuestionarioService: CuestionarioService,
              private router: Router) { }

  ngOnInit(): void {
    this.idCuestionario = this.respuestaCuestionarioService.idCuestionario;
    if (this.idCuestionario == null) {
      this.router.navigate(['/inicio']);
      return;
    }
    this.getCuestionario();
    this.respuestaCuestionarioService.respuestas = [];
  }
  getCuestionario(): void{
    this.loading = true;
    this.cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data => {
      this.rta = data
      this.listPregunta = data.listPregunta;
      this.loading = false;
      this.respuestaCuestionarioService.cuestionario = data;
    })
  }

  obtenerPregunta(): string{
    return this.listPregunta[this.index].descripcion;
  }
  
  getIndex(): number{
    return this.index;
  }

  respuestaSeleccionada(respuesta: any, idRespuesta: any): void{
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada = true;
    this.idRespuestaSeleccionada = idRespuesta;
  }

  AddClassOption(respuesta: any): string{
    if(respuesta === this.opcionSeleccionada){
      return 'active text-light';
    }
    return '';
  }

  siguiente(): void{
    this.respuestaCuestionarioService.respuestas.push(this.idRespuestaSeleccionada);

    // Creamos un objeto RespuestaDetalle
    const detalleRespuesta: RespuestaCuestionarioDetalle = {
      respuestaId: this.idRespuestaSeleccionada
    };

    //Agregamos objeto al array
    this.listRespuestaDetalle.push(detalleRespuesta);


    this.rtaConfirmada = false;
    this.index++;
    this.idRespuestaSeleccionada = 0;
    if(this.index === this.listPregunta.length){
      this.guardarRespuestaCuestionario();
    }
  }
  guardarRespuestaCuestionario(): void {
    const rtaCuestionario: RespuestaCuestionario = {
      cuestionarioId: this.respuestaCuestionarioService.idCuestionario,
      nombreParticipante: this.respuestaCuestionarioService.nombreParticipante,
      ListRtaCuestionarioDetalle: this.listRespuestaDetalle
    };
    this.loading = true;
    this.respuestaCuestionarioService.guardarRespuestaCuestionario(rtaCuestionario).subscribe(data =>{
      this.loading = false
      this.router.navigate(['/inicio/listCuestionarios/respuestaCuestionario']);
    }, error =>{
      this.loading = false;
      console.log(error);
    });
  }

}
