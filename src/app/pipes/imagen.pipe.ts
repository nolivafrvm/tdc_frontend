import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { URL_SERVICES } from '../config/config';
const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  // transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {

  //   if (!img) {
  //     return  `${base_url}/upload/usuarios/no-image`;
  //   } else if (img.includes('https')) {
  //     return img; 
  //   } else if (img) {
  //     return `${base_url} /upload/${tipo}/${img}`;
  //   } else {
  //     return `${base_url} /upload/usuarios/no-image`;
  //   }
  // }

  transform(img:string, tipo: string='usuario'): any {
    let url = URL_SERVICES + '/img';    

    if (!img) {
      url = "../assets/no-img.jpg";
      return url;
      // return url + '/usuarios/xxx';
    }

    if (img.indexOf('https') >=0 ) {
      return img;
    }

    switch( tipo ) {
        case 'usuario':
          url += "/usuarios/" + img;
          break;
        case 'hospital':
          url += "/hospitales/" + img;
          break;
        case 'medico':
          url += "/medicos/" + img;
          break;  
        default:
          console.log("Tipo de imagen no existente");  
          url += '/usuarios/xxx';
    }    
    url = "../assets/no-img.jpg";
    return url;
  }
}
