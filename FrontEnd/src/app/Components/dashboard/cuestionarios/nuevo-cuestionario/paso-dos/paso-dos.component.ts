import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cuestionario } from 'src/app/models/cuestionario';
import { Pregunta } from 'src/app/models/pregunta';
import { CuestionarioService } from 'src/app/services/cuestionario.service';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent implements OnInit {
  tituloCuestionario!: string;
  descripcionCuestionario!: string;
  listPregunta: Pregunta[] = [];
  constructor(private cuestionarioService: CuestionarioService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
  }

  guardarPregunta(pregunta: Pregunta): void{
    this.listPregunta.push(pregunta);
  }

  eliminarPregunta(index: number): void{
    this.listPregunta.splice(index, 1);
  }

  guardarCuestionario():void{
    const cuestionario: Cuestionario ={
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      listPregunta: this.listPregunta
    };
    console.log(cuestionario);
    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe(data =>{
      this.toastr.success('El cuestionario fue reguistrado con exito', 'Cuestionario Registrado');
      this.router.navigate(['/dashboard']);
    }, error => {
      this.toastr.error('Opss... Ocurrió un error', 'Error');
      this.router.navigate(['/dashboard']);
    })
  }
}
