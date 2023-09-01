import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map, Observable } from 'rxjs';
import { Novedad } from 'src/app/models/novedad/novedad.model';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  constructor(private http: HttpClient) {}

  async cargarNovedades(fechaInicio:string, fechaFin:string, page:number, size:number): Promise<Novedad[]> {
    const url = `${base_url}/novedad/rangoFechas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&page=${page}&size=${size}`;
    return await lastValueFrom(this.http.get<Novedad[]>(url));
    //toPromise esta deprecado, por eso se usa el lastValueFrom
    //y esto se hace para poder hacer async la funcion y esperar a diferencia de Observable
      // .pipe(map((resp:Novedad[]) => {
      //   return resp;
      // }));
  }

  traerNovedadById(idNovedad : string) : Observable<Novedad> {
    const url = `${base_url}/novedad/${idNovedad}`;
    return this.http.get(url)
      .pipe(map((resp:Novedad) => {
        return resp;
      }));
  }

  borrarNovedad(idNovedad : string) : Observable<void> 
  {
    const url = `${base_url}/novedad/${idNovedad}`;
    return this.http.delete(url)
      .pipe(map((resp:any) => {
        return resp;
      }));
  }

  buscarNovedad(termino: string, fechaInicio:string, fechaFin:string, page:number, size:number) : Observable<Novedad[]> {
    const url = `${base_url}/novedad/busqueda?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&page=${page}&size=${size}&descripcion=${termino}`;
    return this.http.get(url)
      .pipe(map((resp:any) => {
        return this.verificarBusqueda(resp);
      }));
  }

  traerUltimaNovedad() : Observable<Novedad> {
    const url = `${base_url}/novedad/ultimaNovedad`;
    return this.http.get(url)
      .pipe(map((resp:Novedad) => {
        return resp;
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
