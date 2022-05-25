import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';
import { CuestionarioService } from 'src/app/services/cuestionario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit {
  userName!: any;
  listCuestionarios: Cuestionario[] = [];
  loading = false;
  constructor(private loginService: LoginService,
              private cuestionarioService: CuestionarioService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserName();
    this.getCuestionarios();
  }

  getUserName(): void{
    this.userName = this.loginService.getTokenDecoded().sub;
  }

  getCuestionarios(): void {
    this.loading = true;
    this.cuestionarioService.getListCuestionarioByUser().subscribe(data =>{
      this.listCuestionarios = data
      this.loading = false;
    },error => {
      console.log(error);
      this.loading = false;
      // this.toastr.error('Ocurrió un error', 'error');
    })
  }

  eliminarCuestionario(idCuestionario: any): void{
    if(confirm('¿Estás seguro que deseas eliminar este cuestionario?')){
      this.loading = true;
      this.cuestionarioService.deleteCuestionario(idCuestionario).subscribe(data =>{
        this.loading = false
        this.toastr.success('El cuestionario fue eliminado con exito','Registro Eliminado');
        this.getCuestionarios();
      }, error => {
        this.loading = false;
        this.toastr.error('Ocurrió un error', 'error'); 
      })
    }
  }
}
