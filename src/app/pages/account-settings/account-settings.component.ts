import { Component, OnInit } from '@angular/core';

// Servicios
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustes:SettingsService )  { }

  ngOnInit() {
    // Cando a páxina se cargue a función revisa que elemento do HTML ten o atributo data-theme que coincide co tema obtido de settings.service.ts.
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any ) {
    // Evento que modifica o tema. Faino a traves do servicio _ajustes.
    this._ajustes.aplicarTema(tema);
    // Chamada á función que aplica a clase working ao enlace seleccionado.
    this.aplicarCheck( link );
  }

  aplicarCheck( link: any ) {
    // Aplicación para asignar a clase working en función do tema gardado en settings.service.ts
    // Crear un array con todos os enlaces.
    let selectores: any = document.getElementsByClassName('selector');
    for (let ref of selectores){
      // Recorrer todos os elementos e eliminar a clase working de quen o teña.
      ref.classList.remove('working');
    }
    // Asigna a clase ao link que se lle pasa por parámetro á función. Marcando o tema elexido cunha V.
    link.classList.add('working');
  }

  colocarCheck() {
    // Crear un array con todos os enlaces.
    let selectores: any = document.getElementsByClassName( 'selector' );
    let tema = this._ajustes.ajustes.tema;
    for ( let ref of selectores ) {
      // Recorrer todos os elementos e comprobar e o tema gardado en axustes se corresponde co atributo data-theme de algún elemento, de ser así, ese é o tema seleccionado e pónselle a clase working.
      if( ref.getAttribute('data-theme') == tema ){
        ref.classList.add('working');
        break;
      }
    }
  }
}
