import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from 'src/app/models/pregunta';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent implements OnInit {
  nuevaPregunta: FormGroup;
  pregunta!: Pregunta;
  rtaCorrecta = 0;
  @Output() enviarPregunta = new EventEmitter<Pregunta>();
  constructor(private fb: FormBuilder,
              private toastr: ToastrService) {
    this.nuevaPregunta = this.fb.group({
      titulo: ['', Validators.required],
      respuestas: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.agregarRespuestaPorDefecto();
  }

  //Devuelve formarray de respuestas
  get getRespuestas(): FormArray{
    return this.nuevaPregunta.get('respuestas') as FormArray
  }

  //Agregar respuestas al array
  agregarRespuesta(): void{
    if(this.getRespuestas.length != 4){
      this.getRespuestas.push(this.fb.group({
        descripcion: ['', Validators.required],
        esCorrecta: 0
      }));
    }else{
      this.toastr.error('Llegaste al limite de respuesta permitido', 'error')
    }
  }

  agregarRespuestaPorDefecto(): void{
    this.agregarRespuesta();
    this.agregarRespuesta();
  }

  eliminarRespuesta(index: number):void{
    if(this.getRespuestas.length === 2){
      this.toastr.error('La pregunta debe contener dos respuesta como minimo', 'error');
    }
     else{
      this.getRespuestas.removeAt(index);
    }
  }
  setRespuestaValida(index: number): void{
    this.rtaCorrecta = index
  }
  agregarPregunta():void{
    //obtenemos el titulo de la pregunta
    const descripcionPregunta  = this.nuevaPregunta.get('titulo')?.value;

    //obtenemos el array de respuesta
    const arrayRespuestas = this.nuevaPregunta.get('respuestas')?.value;

    //creamos un array de respuestas
    const arrayRta: Respuesta[] = [];

    arrayRespuestas.forEach((element: { descripcion: string; }, index: number ) => {
      const respuesta: Respuesta = new Respuesta(element.descripcion, false);
      if (index === this.rtaCorrecta){
        respuesta.esCorrecta = true;
      }
      arrayRta.push(respuesta);
    });
    
    const pregunta: Pregunta = new Pregunta(descripcionPregunta, arrayRta);
    
    this.enviarPregunta.emit(pregunta);

    this.reset();
  }

  reset(): void{
    this.rtaCorrecta = 0;
    this.nuevaPregunta.reset();
    this.getRespuestas.clear();
    this.agregarRespuestaPorDefecto();
  }
}  

