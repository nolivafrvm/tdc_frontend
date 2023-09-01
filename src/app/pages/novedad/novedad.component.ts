import { Component, OnInit } from '@angular/core';
import { Novedad } from 'src/app/models/novedad/novedad.model';
import Swal from 'sweetalert2';
import { NovedadService } from '../../services/service.index';

@Component({
  selector: 'app-novedad',
  templateUrl: './novedad.component.html',
  styles: [
  ]
})
export class NovedadComponent implements OnInit {

  public novedades = [] ;
  public cargando: boolean = true;

   // Parametros query novedades 
   public novedadFechaInicio: string;
   public novedadFechaFin: string; 
   public novedadSize: number = 5;
   public novedadPage: number = 0; 
  esCarga: boolean;

  constructor(private novedadService: NovedadService) { }

  async ngOnInit() {
    this.novedadFechaFin = new Date().toISOString();
    this.novedadFechaInicio = new Date(this.getYesterday()).toISOString();       
    await this.cargarNovedades();    
  }  


  getYesterday(): number {
    return new Date().setDate(new Date().getDate() -1);
  }

  async cargarNovedades() {
    this.cargando = true;
    await this.novedadService.cargarNovedades(this.novedadFechaInicio, this.novedadFechaFin, this.novedadPage, this.novedadSize)
      .then((novedades) => {
        this.cargando = false;
        if ( novedades ) {
          this.novedades = novedades; 
        }
      }); 
  }

  

  buscar(termino: string) {
    console.log("Termino", termino);
    if ( termino.length ===0 ) {
      return;
    }
    console.log(this.novedadFechaFin);
    console.log(this.novedadFechaInicio);
    console.log(this.novedadPage);
    console.log(this.novedadSize);


    this.novedadService.buscarNovedad(termino, this.novedadFechaInicio, this.novedadFechaFin, this.novedadPage, this.novedadSize)    
      .subscribe((resp:any) => {
        this.novedades = resp;
      });
  }

  borrarNovedad(novedad:Novedad) {
    Swal.fire({
      title : "¿Borrar el novedad?",
      text : `Esta a punto de borrar a ${novedad.descripcion}`,
      icon : "question",
      showCancelButton : true, 
      confirmButtonText : "Si, borrarlo",
    }).then((result) => {
      if (result.value) {
        this.novedadService.borrarNovedad(novedad.idNovedad).subscribe((resp) => {
          this.cargarNovedades();
          Swal.fire(
            'Novedad borrado',
            `${novedad.descripcion} fue eliminado correctamente`,
            'success'
          );
        });
      }
    });
  }

}
