import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { SidebarService } from 'src/app/services/shared/sidebar.service';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  usuario:Usuario

  constructor(public _usuarioService:UsuarioService,
    public _sidebarService : SidebarService) { 

  }

  ngOnInit(): void {
    //this.usuario = this._usuarioService.usuario;    
    this.usuario = new Usuario('Nico','Oliva', 'nico@test','');
    this._sidebarService.cargarMenu();
  }

}
