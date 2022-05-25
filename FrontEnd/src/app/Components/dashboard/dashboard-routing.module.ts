import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';
import { CuestionarioComponent } from './cuestionarios/cuestionario/cuestionario.component';
import { CuestionariosComponent } from './cuestionarios/cuestionarios.component';
import { DetallesRespuestaComponent } from './cuestionarios/estadisticas/detalles-respuesta/detalles-respuesta.component';
import { EstadisticasComponent } from './cuestionarios/estadisticas/estadisticas.component';
import { NuevoCuestionarioComponent } from './cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
import { PasoDosComponent } from './cuestionarios/nuevo-cuestionario/paso-dos/paso-dos.component';
import { PasoUnoComponent } from './cuestionarios/nuevo-cuestionario/paso-uno/paso-uno.component';

const routes: Routes = [
  {path: '',component: CuestionariosComponent},
  {path: 'cambiarContraseña', component: CambiarPasswordComponent},
  {path: 'verCuestionario/:id', component: CuestionarioComponent},
  {path: 'estadistica/:id', component: EstadisticasComponent},
  {path: 'detalleRespuesta/:id', component: DetallesRespuestaComponent},
  {path: 'nuevoCuestionario', component: NuevoCuestionarioComponent, children:[
    {path: 'pasoUno', component: PasoUnoComponent},
    {path: 'pasoDos', component: PasoDosComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
