import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from "../../shared/shared.module";

//Componentes
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { CuestionariosComponent } from './cuestionarios/cuestionarios.component';
import { NuevoCuestionarioComponent } from './cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
import { PasoUnoComponent } from './cuestionarios/nuevo-cuestionario/paso-uno/paso-uno.component';
import { PasoDosComponent } from './cuestionarios/nuevo-cuestionario/paso-dos/paso-dos.component';
import { NuevaPreguntaComponent } from './cuestionarios/nuevo-cuestionario/paso-dos/nueva-pregunta/nueva-pregunta.component';
import { CuestionarioComponent } from './cuestionarios/cuestionario/cuestionario.component';
import { EstadisticasComponent } from './cuestionarios/estadisticas/estadisticas.component';
import { DetallesRespuestaComponent } from './cuestionarios/estadisticas/detalles-respuesta/detalles-respuesta.component';

@NgModule({
  declarations: [
    CambiarPasswordComponent,
    CuestionariosComponent,
    NuevoCuestionarioComponent,
    PasoUnoComponent,
    PasoDosComponent,
    NuevaPreguntaComponent,
    CuestionarioComponent,
    EstadisticasComponent,
    DetallesRespuestaComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
