import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // Obxeto ajustes cos valores por defecto.
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  // Inyectar o document para poder acceder a calquera elemento do documento, nete caso a un link do head.
  constructor( @Inject( DOCUMENT ) private _document) { 
    // Para que cada vez que se instancie o servicio acceda ao localStorage buscando se hai axustes gardados.
    this.cargarAjustes();
  }

  guardarAjustes() {
    // Garda o obxeto axustes no localStorage co nome ajustes.
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    // Carga os obxetos gardados no localStorage.
    // Comprobar que existen algúns axustes gardados no localStorage. Se existe, asignar os datos gardados ao obxeto ajustes.
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      // Definir o novo tema cargado no link correspondente do head do documento.
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema( tema:string ) {
    // Construir o enlace ao tema elexido.
    let url: string = `assets/css/colors/${ tema }.css`;
    // Establecer o novo href no link no head do documento.
    this._document.getElementById( 'theme' ).setAttribute( 'href', url );
    // Asignar os novos valores ao obxeto ajustes.
    this.ajustes.temaUrl = url;
    this.ajustes.tema = tema;
    // Gardar os novos ajustes no localStorage.
    this.guardarAjustes();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
