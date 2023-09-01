import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public cargando: boolean = true;

  constructor(private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    console.log(this.usuarios);  
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios()
      .subscribe((usuarios) => {
        this.cargando = false;
        if (usuarios) {
          this.usuarios = usuarios;
        }        
      });
  }

  buscar(termino: string) {
    if ( termino.length === 0) {
      return;
    }

    this.usuarioService.buscarUsuario(termino)
      .subscribe((resp:any) => {
        this.usuarios = resp;
      });
  }

  borrarUsuario(usuario:Usuario) {
    Swal.fire({
      title : "¿Borrar el usuario?",
      text : `Esta a punto de borrar a ${usuario.nombre}`,
      icon : "question",
      showCancelButton : true, 
      confirmButtonText : "Si, borrarlo",
    }).then((result) => {
      if (result.value) {
        this.usuarioService.borrarUsuario(usuario.idUsuario).subscribe((resp) => {
          this.cargarUsuarios();
          Swal.fire(
            'Usuario borrado',
            `${usuario.nombre} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }
}
