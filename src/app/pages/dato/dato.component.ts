import { Component, OnInit } from '@angular/core';
import { Dato } from 'src/app/models/dato/dato.model';
import Swal from 'sweetalert2';
import { DatoService } from '../../services/service.index';

@Component({
  selector: 'app-dato',
  templateUrl: './dato.component.html',
  styles: [
  ]
})
export class DatoComponent implements OnInit {

  public datos: Dato[] = [];
  public cargando: boolean = true;

  // Parametros query datos 
  public datoFechaInicio: string;
  public datoFechaFin: string; 
  public datoSize: number = 5;
  public datoPage: number = 0; 

  constructor(private datoService: DatoService) { }

  ngOnInit(): void {
    console.log("INIT");
    let today = new Date();
    this.datoFechaFin = new Date().toISOString();
    this.datoFechaInicio = new Date(this.getYesterday()).toISOString();     
    this.cargarDatos();    
  }

  getYesterday(): number {
    return new Date().setDate(new Date().getDate() -1);
   }

  cargarDatos() {
    this.cargando = true;
    this.datoService.cargarDatos(this.datoFechaInicio, this.datoFechaFin, this.datoPage, this.datoSize)
      .subscribe((datos) => {
        this.cargando = false;
        if ( datos ) {
          this.datos = datos;
        }
      });      
  }

  buscar(termino: string) {
    if ( termino.length ===0 ) {
      return;
    }

    this.datoService.buscarDato(termino)
      .subscribe((resp:any) => {
        this.datos = resp;
      });
  }

  borrarDato(dato:Dato) {
    Swal.fire({
      title : "¿Borrar el dato?",
      text : `Esta a punto de borrar a ${dato.valor}`,
      icon : "question",
      showCancelButton : true, 
      confirmButtonText : "Si, borrarlo",
    }).then((result) => {
      if (result.value) {
        this.datoService.borrarDato(dato.idDato).subscribe((resp) => {
          this.cargarDatos();
          Swal.fire(
            'Dato borrado',
            `${dato.valor} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }
}
