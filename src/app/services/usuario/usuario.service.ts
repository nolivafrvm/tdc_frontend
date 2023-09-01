import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {    

  constructor(private http: HttpClient) {}

  cargarUsuarios() : Observable<Usuario[]> {
    const url = `${base_url}/usuario`;
    return this.http.get(url)
      .pipe(map((resp:Usuario[]) => {
        return resp;
      }));
  }

  traerUsuarioById(id : string) : Observable<Usuario> {
    const url = `${base_url}/usuario/${id}`;
    return this.http.get(url).pipe(
      map((resp:Usuario) => {
        return resp;
      })
    );
  }

  crearUsuario(usuario:Usuario) : Observable<Usuario> {
    const url = `${base_url}/usuario`;
    return this.http.post(url, usuario)
      .pipe(map((resp:Usuario) => {
        return resp;
      }));
  }

  actualizarUsuario(usuario: Usuario) : Observable<Usuario> {
    const url = `${base_url}/usuario/${usuario.idUsuario}`;
    return this.http.put(url, usuario)
      .pipe(map((resp:Usuario) => {
        return resp;
      }));
  }

  borrarUsuario( idUsuario:number ) : Observable<void>
  {
    const url = `${base_url}/usuario/${idUsuario}`;
    return this.http.delete(url)
      .pipe(map((resp:any) => {
        return resp;
      }));
  }

  buscarUsuario(termino : string) : Observable<Usuario[]> {
    const url = `${base_url}/usuario/${termino}`;
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


  logout() {}
}
