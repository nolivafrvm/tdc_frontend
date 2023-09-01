import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Dato } from 'src/app/models/dato/dato.model';
import { Novedad } from 'src/app/models/novedad/novedad.model';
import { DatoService, NovedadService } from 'src/app/services/service.index';
import { StockChart} from 'angular-highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

   public datos: Dato[] = [];
   public cargando: boolean = true;
   stock: StockChart;  
   
   // Widget Uno
   public ultimoDato:Dato = new Dato();
   public ultimaNovedad: Novedad = new Novedad();
   public porcentajeOcupacion:number;
   public porcentajeVariacion:number;
   public volumen:number = 40000;
   
   // Parametros query datos 
   public datoFechaInicio: string;
   public datoFechaFin: string;   

   // Parametros query datos 
   public novedadFechaInicio: Date;
   public novedadFechaFin: Date;
   public novedadPage:number;
   public novedadSize:number

   // Variables para graficos   
   public dataSerieStock = [];



   esCarga: boolean;
   
  constructor(private datoService: DatoService,
   private novedadService:NovedadService) {

  }  

  ngOnInit(): void {   
   this.traerUltimoDato();   
   this.traerUltimaNovedad();
   this.datoFechaFin = new Date().toISOString();
   this.datoFechaInicio = new Date(this.getYesterday()).toISOString();      
   this.cargarDatos();
   console.log(this.ultimaNovedad.descripcion)
 }

 prueba(){
   this.esCarga = this.ultimaNovedad.descripcion === 'Carga' ? true : false;
 }
 
 getPorcentajeVariacion() {
   if (this.ultimaNovedad && this.ultimoDato) {      
      this.porcentajeVariacion = (((Number(this.ultimoDato.valor)/Number(this.ultimaNovedad.valorAnterior))-1)*100);         
   }
 }

 crearStockChart() {   
   Highcharts.setOptions({
      global: {
        timezoneOffset: 180 // Desplazamiento de 180 minutos (3 horas)
      }
    });
   this.stock = new StockChart({
      rangeSelector: {
        selected: 1
      },      
      title: {
         text: "Temperatura - AppSensor"
      },  
      subtitle: {
         text: "Carga y descarga"
      },       
      yAxis: {    
         labels : {
           formatter: function() {
              return Highcharts.numberFormat(Number(this.value), 0, '.');
           }
      }
      },
      tooltip: {
         valueSuffix:" Lts"
      },
      series: [{
        tooltip: {
          valueDecimals: 2
        },
        name: 'Temperatura',
        data: this.dataSerieStock
      }]
    });
 }

 setupDataChart(datos: Dato[]) {      
   if (this.datos) {
      this.datos.forEach(element => {               
         this.dataSerieStock.push([Date.parse(element.fecha.toString()), Number(element.valor)]);                           
      });      
   }       
 }

 getYesterday(): number {
   return new Date().setDate(new Date().getDate() -365);
  }

  getPorcentaje(dato: Dato) {
   if (this.ultimoDato!=null) {      
      let ocupacion:number = Number(this.ultimoDato.valor);      
      if (Number(ocupacion) >= 0) {
         this.porcentajeOcupacion = (ocupacion/this.volumen) * 100;
      }                  
   }
  }

 traerUltimoDato() {
   this.datoService.traerUltimoDato().subscribe(dato => {
      if (dato) {
         this.ultimoDato = dato;
         this.getPorcentaje(dato);
      };
   });
 }

 traerUltimaNovedad() {
   this.novedadService.traerUltimaNovedad()
      .subscribe(novedad => {
         if (novedad) {
            this.ultimaNovedad = novedad;
            this.getPorcentajeVariacion();
            this.prueba()
         }
      });
 }

 cargarDatos() {   
   this.cargando = true;   
   this.datoService.cargarDatos(this.datoFechaInicio, this.datoFechaFin, 0,0)
      .subscribe((datos) => {
         if (datos) {
            this.datos = datos;            
            this.setupDataChart(this.datos);  
            this.crearStockChart();            
         }
      });            
 } 
}

