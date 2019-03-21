import { Component, OnInit } from '@angular/core';

// Servicios
import { SidebarService } from './../../services/service.index';
import { UsuarioService } from './../../services/usuario/usuario.service';

// Models
import { Usuario } from 'src/app/models/usuario.model';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(public _sidebar:SidebarService, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    // Asignar a variable usuario do servicio usuario cando se inicie o componente.
    this.usuario = this._usuarioService.usuario;
  }

}
