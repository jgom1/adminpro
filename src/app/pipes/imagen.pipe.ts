import { Pipe, PipeTransform } from '@angular/core';

// Constantes
import { URL_SERVICIOS } from './../config/config';

@Pipe( {
  name: 'imagen'
} )
export class ImagenPipe implements PipeTransform {

  transform ( img: string, tipo: string = 'usuario' ): any {
    // Declarar a url coa que chamaremos ao servidor.
    // Exemplo Url -> http://localhost:3000/img/usuarios/sdfguyuygeyf.png
    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      // Se non recibe ningunha imaxe fai unha chamada a unha imaxe que non exista para que devolva a imaxe por defecto no-image.png
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf( 'https' ) >= 0 ) {
      // Se a imaxe contén https significa que é o enlace á imaxe de google, polo tanto devolvemos a imaxe directamente.
      return img;
    }

    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;
      default:
        console.log( 'El tipo de imagen no existe: usuarios, medicos, hospitales.' )
        url += '/usuarios/xxx';
    }

    return url;
  }

}
