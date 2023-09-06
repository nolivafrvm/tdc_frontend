import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario:Usuario;

  constructor(public _usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuario = new Usuario('admin','admin@test','','img');
  }

  buscar(value:string) {
    console.log(value);

  }

}
