import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Services
import { UsuarioService } from './../usuario/usuario.service';


@Injectable( {
  providedIn: 'root'
} )
export class VerificaTokenGuard implements CanActivate {

  constructor ( public _usuarioService: UsuarioService, public router: Router ) { }

  canActivate(): Promise<boolean> | boolean {
    // Obter token
    let token = this._usuarioService.token;
    // Obter contido do token. 
    // A función atob decodifica algo codificado en base64.
    // Payload devolve exp(fecha de expiración do token). 
    let payload = JSON.parse( atob( token.split( '.' )[ 1 ] ) );
    // Verificar se a data do token expirou ou non (true|false)
    let expirado = this.expirado( payload.exp );
    if ( expirado ) {
      // Se o token xa expirou devolver o guard con false para que non lle permita entrar ou seguir nesa páxina.
      // Redireccionar ao login.
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificaRenueva( payload.exp );
  }

  verificaRenueva( fechaExp: number ): Promise<boolean> {
    // Función que verifica se hai que renovar o token.
    return new Promise( ( resolve, reject ) => {
      // Crear unha fecha co parámetro obtido.
      let tokenExp = new Date( fechaExp * 1000 );
      // Crear a fecha actual.
      // Unha validación adicional sería obter a fecha da base de datos, xa que esta fecha é a do navegador e puidera ser modificada polo usuario.
      let ahora = new Date();
      // Incrementamos ahora en 4 horas.
      ahora.setTime( ahora.getTime() + ( 4 * 60 * 60 * 1000 ) );

      if ( tokenExp.getTime() > ahora.getTime() ) {
        // Todavía no hay que renovar el token.
        resolve( true );
      } else {
        // El token está próximo a vecer y hay que renovarlo.
        this._usuarioService.renuevaToken().subscribe(
          () => { resolve( true ); }, // Si la función devuelve true.
          () => {
            // Si la función devuelve false.
            reject( false ); 
            // Redireccionar ao login.
            this.router.navigate( [ '/login' ] ); } 
        )
      }
    } );
  }

  expirado( fechaExp: number ) {
    // Verificar se o token expirou ou non. Recibe por parámetro a fecha de expiración en segundos.
    // Crear instancia da fecha actual do sistema. getTime devolve a fecha actual en milisegundos.
    let ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora ) {
      // A fecha expirou.
      return true;
    } else {
      // Aínda non expirou.
      return false;
    }
  }
}
