import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Dispositivo } from 'src/app/models/dispositivo/dispositivo.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private http: HttpClient) { }

  crearDispositivo(dispositivo:Dispositivo) : Observable<Dispositivo> {
    const url = `${base_url}/dispositivo`;
    return this.http.post(url, dispositivo)
      .pipe(map((resp:Dispositivo) => {
        return resp;
      }));
  }

  actualizarDispositivo(dispositivo: Dispositivo) : Observable<Dispositivo> {
    const url = `${base_url}/dispositivo/${dispositivo.idDevice}`;
    return this.http.put(url, dispositivo)
      .pipe(map((resp:Dispositivo) => {
        return resp;
      }));
  }

  cargarDispositivos(): Observable<Dispositivo[]> {
    const url = `${base_url}/dispositivo`;
    return this.http.get(url)
      .pipe(map((resp:Dispositivo[]) => {
        return resp;
      }));
  }  

  async traerDispositivoById(idDispositivo : string) {
    const url = `${base_url}/dispositivo/${idDispositivo}`;
    return this.http.get(url)
      .pipe(map((resp:Dispositivo) => {
        return resp;
      }));
  }

  borrarDispositivo(idDispositivo : number) : Observable<void> 
  {
    const url = `${base_url}/dispositivo/${idDispositivo}`;
    return this.http.delete(url)
      .pipe(map((resp:any) => {
        return resp;
      }));
  }

  buscarDispositivo(termino: string) : Observable<Dispositivo[]> {
    const url = `${base_url}/busqueda/dispositivo/${termino}`;
    return this.http.get(url)
      .pipe(map((resp:any) => {
        return this.verificarBusqueda(resp);
      }));
  }  

  configurarDispositivo(idDispositivo: number, action: string): Observable<any> {
    const url = `${base_url}/dispositivo/configurar/${idDispositivo}/${action}`;
    return this.http.get(url);
  }

  verificarBusqueda(resp : any) {
    if (resp!=null) {
      return resp;
    } else {
      return [];
    }
  }

}
