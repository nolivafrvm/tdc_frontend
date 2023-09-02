import { Component, OnInit } from '@angular/core';
import { Dispositivo } from 'src/app/models/dispositivo/dispositivo.model';
import { DispositivoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.component.html',
  styles: [
  ]
})
export class DispositivoComponent implements OnInit {

  public dispositivos: Dispositivo[] = [];
  public cargando: boolean = true;

  constructor(private dispositivoService : DispositivoService) { }

  ngOnInit(): void {
    this.cargarDispositivos();
    console.log(this.dispositivos);  
  }

  cargarDispositivos() {
    this.cargando = true;
    this.dispositivoService.cargarDispositivos()
      .subscribe((dispositivos) => {
        this.cargando = false;
        if (dispositivos) {
          this.dispositivos = dispositivos;
        }        
      });
  }

  buscar(termino: string) {
    if ( termino.length === 0) {
      return;
    }

    this.dispositivoService.buscarDispositivo(termino)
      .subscribe((resp:any) => {
        this.dispositivos = resp;
      });
  }

  borrarDispositivo(dispositivo:Dispositivo) {
    Swal.fire({
      title : "¿Borrar el dispositivo?",
      text : `Esta a punto de borrar a ${dispositivo.name}`,
      icon : "question",
      showCancelButton : true, 
      confirmButtonText : "Si, borrarlo",
    }).then((result) => {
      if (result.value) {
        this.dispositivoService.borrarDispositivo(dispositivo.idDevice).subscribe((resp) => {
          this.cargarDispositivos();
          Swal.fire(
            'Dispositivo borrado',
            `${dispositivo.name} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }

}
