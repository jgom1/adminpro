import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Servicios
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router){}
  canActivate() {
    // Este gard comproba que o usuario teña rol de administrador para mostrar a parte de mantemento do menú.
    if(this._usuarioService.usuario.role === 'ADMIN_ROLE'){
      return true;
    }else{
      console.error('Bloqueado por el guard');
      // Facerlle un logout para redireccionalo á páxina de login e borrar o localStorage.
      this._usuarioService.logout();
      return false;
    }
  }
  
}
