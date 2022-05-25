import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cuestionario } from '../models/cuestionario';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {
  myAppUrl: string;
  myApiUrl: string; 
  tituloCuestionario!: string;
  descripcionCuestionario!: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Cuestionario/';
  }

  guardarCuestionario(Cuestionario: Cuestionario): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, Cuestionario);
  }

  getListCuestionarioByUser(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListCuestionarioByUser');
  }

  deleteCuestionario(idCuestionario: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + idCuestionario);
  }

  getCuestionario(idCuestionario: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + idCuestionario);
  }
  getListCuestionario(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetListCuestionarios');
  }
}
