import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//modulos
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';

//Interceptors
import { AddTokenInterceptor } from '../app/helpers/add-token.interceptor'
 
//componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './Components/inicio/inicio.component';
import { BienvenidaComponent } from './Components/inicio/bienvenida/bienvenida.component';
import { LoginComponent } from './Components/inicio/login/login.component';
import { NavbarComponent } from './Components/dashboard/navbar/navbar.component';
import { RegisterComponent } from './Components/inicio/register/register.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ListCuestionariosComponent } from './Components/inicio/list-cuestionarios/list-cuestionarios.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    BienvenidaComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    ListCuestionariosComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
