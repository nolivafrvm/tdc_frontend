import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Dato } from 'src/app/models/dato/dato.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DatoService {

  constructor(private http: HttpClient) {}

  cargarDatos(fechaInicio:string, fechaFin:string, page:number, size:number): Observable<Dato[]> {
    const url = `${base_url}/dato/rangoFechas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&page=${page}&size=${size}`;
    return this.http.get(url)
      .pipe(map((resp:Dato[]) => {
        return resp;
      }));
  }  

  async traerDatoById(idDato : string) {
    const url = `${base_url}/dato/${idDato}`;
    return this.http.get(url)
      .pipe(map((resp:Dato) => {
        return resp;
      }));
  }

  borrarDato(idDato : string) : Observable<void> 
  {
    const url = `${base_url}/dato/${idDato}`;
    return this.http.delete(url)
      .pipe(map((resp:any) => {
        return resp;
      }));
  }

  traerUltimoDato() : Observable<Dato> {
    const url = `${base_url}/dato/ultimoDato`;
    return this.http.get(url)
      .pipe(map((resp:Dato) => {
        return resp;
      }));
  }

  buscarDato(termino: string) : Observable<Dato[]> {
    const url = `${base_url}/busqueda/dato/${termino}`;
    return this.http.get(url)
      .pipe(map((resp:any) => {
        return this.verificarBusqueda(resp);
      }));
  }

  verificarBusqueda(resp : any) {
    if (resp!=null) {
      return resp;
    } else {
      return [];
    }
  }


}
