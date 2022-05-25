import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { BienvenidaComponent } from './Components/inicio/bienvenida/bienvenida.component';
import { InicioComponent } from './Components/inicio/inicio.component';

import { LoginComponent } from './Components/inicio/login/login.component';
import { RegisterComponent } from './Components/inicio/register/register.component';


import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path: 'inicio', component : InicioComponent, children:[
    {path: '', component: BienvenidaComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'listCuestionarios', loadChildren: () => import('./Components/inicio/list-cuestionarios/list-cuestionarios.module').
                                                    then(x => x.ListCuestionariosModule)},
  ]},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard],
                      loadChildren:()=> import('./Components/dashboard/dashboard.module')
                      .then(x => x.DashboardModule)},
  {path: '**', redirectTo: '/inicio', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
