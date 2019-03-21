import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';

@Injectable( {
  providedIn: 'root'
} )
export class SubirArchivoService {

  constructor () { }

  subirArchivo ( archivo: File, tipo: string, id: string ) {
    // Función para subir imaxes.
    // tipo = usuarios | medicos | hospitales
    //id = id do usuario/medico/hospital ao que lle imos subir a imaxe.
    // Úsase Javascript puro(XNLHttpRequest) porque angular aínda non ten ferramentas para subir arquivos por si mesmo.

    return new Promise( ( resolve, reject ) => {
      // Este é o payload que se quere mandar subir.
      let formData = new FormData();
      // Inicializar petición ajax.
      let xhr = new XMLHttpRequest();
      // Configuración do formData
      formData.append( 'imagen', archivo, archivo.name );
      // Configurar a petición ajax. Ser notificados con calquera cambio.
      xhr.onreadystatechange = function () {
        // É similar a un observable, vaise esta recibindo información cada vez que o estado cambie.
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            // Comprobar que o servidor devolve un código 200.
            console.log( 'Imagen subida' );
            // Se se sube chamar a resolve e envíase a resposta do servidor convertida en obxeto.
            resolve( JSON.parse( xhr.response ));
          }else{
            // Se falla chamar a reject e envíase a resposta do servidor convertida en obxeto.
            console.error('Falló la subida');
            reject( JSON.parse( xhr.response ));
          }
        }
      };

      // Definir o url a onde faremos a petición
      // Ej: http://localhost:3000/upload/usuarios/5c86a5b679502517f4947b49
      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    } );
  }
}
