import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Usuario } from '../models/usuario/usuario.model';
import { UsuarioService } from '../services/service.index';


//declare function init_plugins():any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma!:FormGroup;
  

  constructor(public _usuarioService:UsuarioService,
    public router:Router) { }

  ngOnInit(): void {
   // init_plugins();

    this.forma = new FormGroup({
      nombre : new FormControl( null, Validators.required),
      apellido : new FormControl( null, Validators.required),
      correo : new FormControl( null, [Validators.required, Validators.email]),
      password : new FormControl( null, Validators.required),
      password2 : new FormControl( null, Validators.required),
      condiciones : new FormControl(false)
    } , { validators: this.passwordsIguales('password', 'password2') } );

    this.forma.setValue({
      nombre : 'Test',
      apellido : 'Test Apellido',
      correo : 'Test@hotmail.com',
      password : '123456',
      password2 : '123456',
      condiciones: true
    });
  }  

  passwordsIguales(pass1Name: string, pass2Name: string ) {

    return (formGroup: AbstractControl): ValidationErrors | null => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (!pass1Control || !pass2Control) {
        return null;
      }

      if ( pass1Control.value === pass2Control.value ) {
        return null;
      }       
      return {
          passwordsIguales:true
      }    
    }
  }

  registrarUsuario() {

    if (this.forma.invalid) {      
      return;
    }

    if (!this.forma.value.condiciones) {
      Swal.fire('Error', "Debe seleccionar las condiciones necesarias", 'error' );
      return;
    }    

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.apellido,
      this.forma.value.correo,
      this.forma.value.password      
    );

    // this._usuarioService.crearUsuario(usuario)
    //   .subscribe( resp => this.router.navigate(['/login']));
  }
  
}
