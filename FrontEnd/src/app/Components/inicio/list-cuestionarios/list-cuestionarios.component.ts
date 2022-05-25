import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { RespuestaCuestionarioService } from 'src/app/services/respuesta-cuestionario.service';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit {
  loading = false;
  listCuestionario: Cuestionario[]=[];
  usuario: any;
  constructor(private CuestionarioService: CuestionarioService,
              private router: Router,
              private respuestaCuestionario: RespuestaCuestionarioService) { }

  ngOnInit(): void {
    this.getListCuestionario();
  }

  getListCuestionario(): void{
    this.loading = true
    this.CuestionarioService.getListCuestionario().subscribe(data =>{
      this.loading = false;
      this.listCuestionario = data;
      this.usuario = data;
    })
  }

  ingresarNombre(idCuestionario: number): any{
    this.respuestaCuestionario.idCuestionario = idCuestionario;
    this.router.navigate(['/inicio/listCuestionarios/ingresarNombre']);
  }
}
