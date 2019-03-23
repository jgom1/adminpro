import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Constante onde se garda a url do servidor ao que se chama para facer as peticións.
import { URL_SERVICIOS } from './../../config/config';

// Models
import { Usuario } from './../../models/usuario.model';

// Servicios
import { SubirArchivoService } from './../subir-archivo/subir-archivo.service';

@Injectable( {
  providedIn: 'root'
} )
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor ( public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService ) {
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
    if ( localStorage.getItem( 'token' ) ) {
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
    localStorage.removeItem( 'id' );
    // Redireccionar á pantalla do login tras desloguearse.
    this.router.navigate( [ '/login' ] );
  }

  loginGoogle ( token: string ) {
    // Construir a url para facer a chamada ao servidor.
    let url = URL_SERVICIOS + '/login/google';
    // Facer a petición POST. O token mándase como un obxeto, ao ser ECMA 6 pódese poñer token en lugar de token: token.
    return this.http.post( url, { token } ).pipe(
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

  actualizarUsuario ( usuario: Usuario ) {
    // Crear a url para facer o PUT de actualizar usuario. URL_SERVICIOS-> http://localhost:3000
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    // Pasarlle o token polo url. Neste caso está configurado así.
    url += '?token=' + this.token;
    // Realizar a chamada put ao servidor para actualizar os datos do usuario (nome + email).
    return this.http.put( url, usuario ).pipe(
      map( ( resp: any ) => {
        // Se o usuario actualizado é o mesmo que o usuario logueado.
        if(usuario._id === this.usuario._id){
          //Actualizar o local storage. O servidor devolve os datos do usuario actualizado na resposta.
          this.guardarStorage( resp.usuario._id, this.token, resp.usuario );
        }
        // Mostrar alerta indicando que se actualizaou o usuario.
        swal( 'Usuario actualizado', usuario.nombre, 'success' );
        // Para indicar que todo se realizou correctamente devolver un true.
        return true;
      } )
    );
  }

  cambiarImagen ( archivo: File, id: string ) {
    // Función que chama ao servicio de subir-archivo para subir a imaxe ao servidor.
    // Neste caso únicamente se cambia a imaxe dun usuario, polo que o tipo vai ser sempre usuarios.
    // A función subirArchivo devolve unha promesa.
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id ).then( ( resp: any ) => {
      // Se todo vai ben, asignar a nova imaxe (devolta polo servidor) á imaxe do obxeto usuario.
      this.usuario.img = resp.usuario.img;
      // Enviar unha alerta ao usuario.
      swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
      // Actualizar o local Storage.
      this.guardarStorage( id, this.token, this.usuario );
    } ).catch( resp => {
      // Se falla algo...
      console.error( resp );
    } );
  }

  cargarUsuarios ( desde: number = 0 ) {
    // Función para obter usuarios do servidor.
    // Parámetro desde é un parámetro da petición usado para paxinar os resultados.
    // Url de chamada ao servidor. Ex: http://localhost:3000/usuario?desde=0
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );
  }

  buscarUsuarios ( termino: string ) {
    // Función para buscar usuarios en función dun termo dado.
    // Url da chamada ao servidor. Ex: http://localhost:3000/busqueda/coleccion/usuarios/test1
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url ).pipe(
      map( ( resp: any ) => {
        // Devolver unicamente o array usuarios da resposta.
        return resp.usuarios;
      } )
    );
  }

  borrarUsuario ( id: string ) {
    // Función para borrar un usuario.
    // Url da chamada ao servidor. Ex: http://localhost:3000/usuario/5c86a1203c59b30ddcfee1a4?token=123sdfuhsiudfh
    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete( url ).pipe(
      map(rep=>{
        // Mostrar alert indicando que o usuario se borrou correctamente.
        swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
        return true;
      })
    );
  }

}
