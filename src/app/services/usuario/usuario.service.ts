import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Constante onde se garda a url do servidor ao que se chama para facer as peticións.
import { URL_SERVICIOS } from './../../config/config';

// Models
import { Usuario } from './../../models/usuario.model';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Injectable( {
  providedIn: 'root'
} )
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor ( public http: HttpClient, public router: Router ) {
    console.log( 'Servicio de usuario listo' );
    // Cada vez que o servicio se inicializa, inicialízanse tamén as propiedades da clase.
    this.cargarStorage();
  }

  estaLogueado (): boolean {
    // Devolve un true ou un false en función de se o usuario está loguado ou non comprobando que a propiedade token teñan algon gardado.
    // O de poñer maior que 5 é por poñer algo, pero simplemente se pretende comprobar que token teñea algo gardado.
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage () {
    // Función que mira no local storage se están cargados o token e usuario e inicializa as propieadades da clase.
    if ( localStorage.getItem( 'toke' ) ) {
      this.token = localStorage.getItem( 'token' );
      this.usuario = JSON.parse( localStorage.getItem( 'usuario' ) );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage ( id: string, token: string, usuario: Usuario ): void {
    // Función para gardar s datos do usuario no localstorage.
    localStorage.setItem( 'id', id ); // Gardar o id do usuario.
    localStorage.setItem( 'token', token ); // Gardar o token, que dura 4h.
    localStorage.setItem( 'usuario', JSON.stringify( usuario ) ); // Gardar os datos do usuario(email,nombre,etc), que veñen nun obxeto.

    // Gardar o usuario e o token recibidos como parámetros da función nas propiedades da clase.
    this.usuario = usuario;
    this.token = token;
  }

  logout () {
    // Función paa facer o logout.
    // Eliminar as propiedades o obxeto.
    this.usuario = null;
    this.token = '';
    // Borrar os datos gardados no local storage.
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'usuario' );
    // Redireccionar á pantalla do login tras desloguearse.
    this.router.navigate(['/login']);
  }

  loginGoogle ( token: string ) {
    // Construir a url para facer a chamada ao servidor.
    let url = URL_SERVICIOS + '/login/google';
    // Facer a petición POST. O token mándase como un obxeto, ao ser ECMA 6 pódese poñer token en lugar de token: token.
    return this.http.post( url, { token: token } ).pipe(
      map( ( resp: any ) => {
        // Gardar os datos da resposta no local storage.
        this.guardarStorage( resp.id, resp.token, resp.usuario );
        // Devolver un true para indicar que a autenticación se fixo correctamente.
        return true;
      } )
    );
  }


  login ( usuario: Usuario, recordar: boolean = false ) {
    // Para facer un login recibimos un usuario e a opción recuérdame do formulario.

    // Se o parámetro recordar ven como true -> gardar no local storage o correo para poñelo por defecto no input correspondente.
    if ( recordar ) {
      localStorage.setItem( 'email', usuario.email );
    } else {
      // Se non quero recordalo, hai que borralo no caso de que estivera gardado previamente.
      // Se non existira, vai intentar borralo pero non vai devolver ningún error.
      localStorage.removeItem( 'email' );
    }

    // Primeiro creamos a url á que imos facer o POST no servidor para realizar o login.
    let url = URL_SERVICIOS + '/login';
    // Facer a chamada por POST.
    return this.http.post( url, usuario ).pipe(
      map( ( resp: any ) => {
        // Tras realizar o login correctamente, gardamos os datos devoltos polo servidor no local storage.
        // Gardar os datos da resposta no local storage.
        this.guardarStorage( resp.id, resp.token, resp.usuario );
        // Devolver un true para indicarlle ao componente que o usuario se logueou correctamente.
        return true;
      } )
    );

  }

  crearUsuario ( usuario: Usuario ) {
    // Crear a url para facer o POST de crear usuario. URL_SERVICIOS-> http://localhost:3000
    let url = URL_SERVICIOS + '/usuario';
    // Devolver un observador. Enviar a url e o usuario que contén os datos do usuario que se quere crear.
    return this.http.post( url, usuario ).pipe( map( ( resp: any ) => {
      // Ao crear o usuario correctamente mostrar unha alerta.
      swal( 'Usario creado', usuario.email, 'success' );
      return resp.usuario;
    } ) );
  }


}