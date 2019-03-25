import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

// Models
import { Usuario } from './../../models/usuario.model';

// Servicios
import { UsuarioService } from './../../services/service.index';

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
} )
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor ( public _usuarioService: UsuarioService, public router: Router ) { }

  ngOnInit() {
    // Asignar a variable usuario do servicio usuario cando se inicie o componente.
    this.usuario = this._usuarioService.usuario;
  }

  buscar( termino: string ) {
    // Función que redirecciona á ruta búsqueda ao facer enter no buscador do header.
    this.router.navigate( [ '/busqueda', termino ] );
  }

}
