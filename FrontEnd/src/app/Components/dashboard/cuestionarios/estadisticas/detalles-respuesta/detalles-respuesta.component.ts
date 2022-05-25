import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { RespuestaCuestionarioDetalle } from 'src/app/models/RespuestaCuestionarioDetalle';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-detalles-respuesta',
  templateUrl: './detalles-respuesta.component.html',
  styleUrls: ['./detalles-respuesta.component.css']
})
export class DetallesRespuestaComponent implements OnInit {
  idRespuesta: any;
  loading = false;
  cuestionario!: Cuestionario;
  respuestas: RespuestaCuestionarioDetalle[]=[]

  constructor(private aRoute: ActivatedRoute,
              private respuestaCuestionarioService: RespuestaCuestionarioService) { 
                this.idRespuesta = this.aRoute.snapshot.paramMap.get('id');
               }

  ngOnInit(): void {
    this.getListRespuestasyCuestionarios();
  }

  getListRespuestasyCuestionarios(): void{
    this.loading = true
    this.respuestaCuestionarioService.getCuestionarioByIdRespuesta(this.idRespuesta).subscribe(data =>{
      this.cuestionario = data.cuestionario;
      this.respuestas = data.respuesta;
      this.loading = false;
      console.log(data);
    })
  }
}
