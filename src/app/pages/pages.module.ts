import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos dentro de pages
import { PagesComponent } from './pages.component';
import { UsuarioComponent } from './usuario/usuario/usuario.component';

import { AccountSettingsComponent } from './account-settings/account-settings.component';

// Importación de rutas en carpeta pages
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuarioEditComponent } from './usuario/usuario/usuario-edit.component';
import { DatoComponent } from './dato/dato.component';
import { NovedadComponent } from './novedad/novedad.component';
import { HighchartsChartModule } from 'highcharts-angular';

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import stock from 'highcharts/modules/stock.src';
import more from 'highcharts/highcharts-more.src';
import { DispositivoComponent } from './dispositivo/dispositivo.component';
import { DispositivoEditComponent } from './dispositivo/dispositivo-edit.component';
import { StompService } from '../services/websocket/stomp.service';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [stock, more];
}


@NgModule({
  declarations: [  
    AccountSettingsComponent,
    UsuarioComponent,
    DashboardComponent,    
    UsuarioEditComponent, DatoComponent, NovedadComponent, DispositivoComponent, DispositivoEditComponent,        
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PAGES_ROUTES,
    PipesModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    ChartModule 
  ], providers:[{ provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }, StompService ],// add as factory to your providers],
   exports: [
    SharedModule,
    DashboardComponent
  ]
})
export class PagesModule { }
