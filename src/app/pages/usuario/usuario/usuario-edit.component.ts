import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {  Usuario } from 'src/app/models/usuario/usuario.model';
import {  UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styles: [
  ]
})
export class UsuarioEditComponent implements OnInit {

  public usuarioForm : FormGroup;
  public usuarioSeleccionado: Usuario;

  public usuarios : Usuario[] = [];  
  

  constructor(private fb: FormBuilder, 
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => this.traerUsuarioById(id));    
    console.log(this.usuarioSeleccionado);    

    this.usuarioForm = this.fb.group({
      nombre : ['' , Validators.required],
      apellido : ['', Validators.required],
      usuario : ['', Validators.required],
      email : ['', Validators.required]})    
  }

  traerUsuarioById(id:string) {
    if (id === 'nuevo') {
      return ;
    }
    this.usuarioService
      .traerUsuarioById(id)
      .subscribe((usuario) => {
        if (!usuario) {
          return this.router.navigateByUrl("/usuario");
        }
        this.usuarioSeleccionado = usuario;
        this.usuarioForm.patchValue({...usuario});
      });
  }  

  guardarUsuario() {    
    if (this.usuarioSeleccionado) {
      const data = {
        ...this.usuarioForm.value,
        idUsuario : this.usuarioSeleccionado.idUsuario
      }
      this.usuarioService.actualizarUsuario(data)
        .subscribe((resp) => {
          Swal.fire(
            'Actualizado',
            `${data.nombre} actualizado correctamente`,
            'success'
          );
        });
    } else {
      const usuario = this.usuarioForm.value;
      this.usuarioService.crearUsuario(usuario)
        .subscribe((resp:Usuario) => {
          Swal.fire('Creado', `${ usuario.nombre } creado correctamente`, 'success');
          this.router.navigateByUrl(`/usuario/${resp.idUsuario}`);
        });
    }
  }
}
