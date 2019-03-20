import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

// Servicios
import { UsuarioService } from './../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService, public router: Router){}

  canActivate() {
      if (this._usuarioService.estaLogueado()) {
        console.log('Pasó por el login guard');
        return true;
      } else {
        console.log( 'Bloqueado por el guard' );
        // Se o bloquea o guard, reenvialo á pantalla de login.
        this.router.navigate(['/login']);
        return false;
      }
  }

}
