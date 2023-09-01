import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [];

  constructor() {}

  cargarMenu() {
    this.menu = [
      {
        titulo: 'Principal',
        icono: 'mdi mdi-gauge',
        submenu: [
          { titulo: 'Dashboard', url: '/dashboard' },
          { titulo: 'Datos de Sensor', url: '/dato' },
          { titulo: 'Novedades', url: '/novedad' }          
        ],
      },            
      {
        titulo: 'Mantenimiento',
        icono: 'mdi mdi-folder-lock-open',
        submenu: [
          { titulo: 'Conf. Novedades', url: '/conf-novedades' },          
          { titulo: 'Usuarios', url: '/usuario' },
        ],
      },
      {
        titulo: 'Información',
        icono: 'mdi mdi-information-outline',
        submenu: [
          { titulo: 'Estadisticas', url: '/estadistica' },
          { titulo: 'Reportes', url: '/reporte' },
        ],
      },
      {
        titulo: 'Manual de usuario',
        icono: 'mdi mdi-bookmark-check',
        submenu: [],
      }
    ];
  }
}
