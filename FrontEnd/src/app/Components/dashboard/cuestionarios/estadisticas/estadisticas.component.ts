import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespuestaCuestionario } from 'src/app/models/RespuestaCuestionario';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  idCuestionario: any;
  loading = false;
  listRespuestaCuestionario: RespuestaCuestionario[] = [];
  listRta: any;

  constructor(private aRoute: ActivatedRoute,
              private respuestaCuestionarioService: RespuestaCuestionarioService,
              private toastr: ToastrService) {
      this.idCuestionario = this.aRoute.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
    this.getListCuestionarioService();
  }

  getListCuestionarioService(): void{
    this.loading = true;
    this.respuestaCuestionarioService.getListCuestionarioRespuesta(this.idCuestionario).subscribe(data => {
      this.listRespuestaCuestionario = data
      this.listRta = data;
      this.loading = false;
    })
  }

  eliminarRespuestaCuestionario(idRtaCuestionario: number): void{
    this.loading = true;
    this.respuestaCuestionarioService.eliminarRespuestaCuestionario(idRtaCuestionario).subscribe(data => {
      this.loading = false;
      this.toastr.success('La respuesta fue eliminada', 'Respuesta Eliminada');
      this.getListCuestionarioService();
    }, error => {
      this.loading = false;
      this.toastr.error('Ocurrió un error eliminando la respuesta', 'ERROR')
    })
  }
}
