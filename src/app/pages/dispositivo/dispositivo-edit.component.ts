import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispositivo } from 'src/app/models/dispositivo/dispositivo.model';
import {  DispositivoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dispositivo-edit',
  templateUrl: './dispositivo-edit.component.html',
  styles: [
  ]
})
export class DispositivoEditComponent implements OnInit {

  public dispositivoForm : FormGroup;
  public dispositivoSeleccionado: Dispositivo;

  public dispositivos : Dispositivo[] = [];  
  

  constructor(private fb: FormBuilder, 
    private router: Router,
    private activatedRoute : ActivatedRoute,
    private dispositivoService : DispositivoService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => this.traerDispositivoById(id));    
    console.log(this.dispositivoSeleccionado);    

    this.dispositivoForm = this.fb.group({
      name : ['' , Validators.required],
      description : ['', Validators.required],
      ipaddress : ['', Validators.required],
      port : ['', Validators.required],
      kd : ['', Validators.required],
      ki : ['', Validators.required],
      kp : ['', Validators.required],
      setpoint : ['', Validators.required],
      ipaddressserver : ['', Validators.required],
      portserver : ['', Validators.required],
      gateway : ['', Validators.required],
      subMask : ['', Validators.required],
      recordPeriod : ['', Validators.required]});
  }

  async traerDispositivoById(id:string) {
    if (id === 'nuevo') {
      return ;
    }
    (await this.dispositivoService
      .traerDispositivoById(id))
      .subscribe((dispositivo) => {
        if (!dispositivo) {
          return this.router.navigateByUrl("/dispositivo");
        }
        this.dispositivoSeleccionado = dispositivo;
        this.dispositivoForm.patchValue({...dispositivo});
      });
  }  

  guardarDispositivo() {    
    if (this.dispositivoSeleccionado) {
      const data = {
        ...this.dispositivoForm.value,
        idDevice : this.dispositivoSeleccionado.idDevice
      }
      console.log(data);
      this.dispositivoService.actualizarDispositivo(data)
        .subscribe((resp) => {
          Swal.fire(
            'Actualizado',
            `${data.name} actualizado correctamente`,
            'success'
          );
        });
    } else {
      const dispositivo = this.dispositivoForm.value;
      this.dispositivoService.crearDispositivo(dispositivo)
        .subscribe((resp:Dispositivo) => {
          Swal.fire('Creado', `${ dispositivo.name } creado correctamente`, 'success');
          this.router.navigateByUrl(`/dispositivo/${resp.idDevice}}`);
        });
    }
  }


  configurarDispositivo(id:number, action: string) {   
    console.log("Configurando dispositivo " + action);     
    return this.dispositivoService.configurarDispositivo(id, action)
      .subscribe((resp:Dispositivo) => {
        if (resp) {
          Swal.fire('Configurado', `${ resp.name } configurado correctamente`, 'success');
        }
      });
  }
}
